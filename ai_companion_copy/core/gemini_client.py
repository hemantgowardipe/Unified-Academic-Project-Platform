import os, base64, fitz
import google.generativeai as genai
from core.supabase_client import get_project_context, store_project_context
from core.redis_client import redis_client   # <--- Add this
import json
from google.generativeai import GenerativeModel
from core.supabase_client import get_project_context
from core.redis_client import redis_client
from django.conf import settings

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def summarize_project(project_id: str, question: str, project_title: str):
    print("🔹 summarize_project called")

    # Normalize question for caching
    normalized_question = question.lower().strip()
    cache_key = f"ai_answer:{project_id}:{normalized_question}"
    context_key = f"project_context:{project_id}"

    print(f"🔹 Cache Key: {cache_key}")

    # Check AI cached answer
    cached_answer = redis_client.get(cache_key)
    print(f"🔹 Cached Answer: {cached_answer}")

    if cached_answer:
        print("💡 Redis HIT - Returning cached AI answer")
        return json.loads(cached_answer)

    # Fetch cached context
    cached_context = redis_client.get(context_key)
    print(f"🔹 Cached Context: {cached_context}")

    if cached_context:
        project_context = cached_context
        print("💡 Redis HIT - Using cached context")
    else:
        print("📥 Supabase Fetch - Getting context...")
        project_context = get_project_context(project_id)

        print("💾 Saving project context to Redis")
        redis_client.set(context_key, project_context, ex=86400)  # TTL 24 hrs

    # Build prompt
    prompt = f"""
    Context Information from the project: {project_title}

    QUESTION:
    {question}

    PROJECT CONTEXT (Important for answer):
    {project_context}

    Provide a clear academic style answer strictly from context. Do not invent details.
    """

    print("🤖 Calling Gemini API...")

    genai.configure(api_key=settings.GEMINI_API_KEY)
    model = GenerativeModel("gemini-2.5-flash")
    response = model.generate_content(prompt)

    answer_text = response.text.strip()

    ai_response = {
        "project_title": project_title,
        "question": question,
        "answer": answer_text,
    }

    print("💾 Saving AI answer into Redis for caching")
    redis_client.set(cache_key, json.dumps(ai_response), ex=86400)

    return ai_response


def extract_text_from_pdf_field(project_data):
    pdf_info = project_data.get("projectSummaryPdf")
    if not pdf_info or not pdf_info.get("data"):
        return None
    try:
        pdf_bytes = base64.b64decode(pdf_info["data"])
        pdf_doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        text = ""
        for page in pdf_doc:
            text += page.get_text("text")
        pdf_doc.close()
        return text.strip()
    except Exception as e:
        print(f"PDF Extraction Error: {e}")
        return None


def get_or_create_project_context(project_id: str, project_data: dict):
    # 🔥 Try Redis first
    redis_key = f"project_context:{project_id}"
    cached_context = redis_client.get(redis_key)

    if cached_context:
        print("📌 Redis HIT - Using cached PDF context")
        return cached_context

    print("📌 Redis MISS - Checking Supabase")
    existing_text = get_project_context(project_id)

    if existing_text:
        print("📦 Supabase HIT - Saving context to Redis (24h)")
        redis_client.set(redis_key, existing_text, ex=86400)  # ← add TTL here
        return existing_text

    print("📌 Supabase MISS - Extracting from PDF...")
    pdf_text = extract_text_from_pdf_field(project_data)

    if pdf_text:
        store_project_context(project_id, pdf_text)
        print("💾 Saving extracted PDF context into Redis (24h)")
        redis_client.set(redis_key, pdf_text, ex=86400)  # ← add TTL here
        return pdf_text

    return "No project context available."


def answer_project_question(project_id: str, project_data: dict, question: str) -> str:
    # === Redis Answer Caching ===
    ai_key = f"ai_answer:{project_id}:{question.lower().strip()}"
    cached_answer = redis_client.get(ai_key)

    if cached_answer:
        print("🤖 Redis HIT - Answer from cache")
        return cached_answer

    print("🤖 Redis MISS - Calling Gemini API")

    pdf_text = get_or_create_project_context(project_id, project_data)

    context = f"""
    You are an academic AI assistant for the Unified Academic Project Portal.

    Project Information:
    Title: {project_data.get('title')}
    Description: {project_data.get('description')}
    Guide: {project_data.get('guideName')}
    Students: {', '.join(project_data.get('students', []))}

    Thesis Text (from PDF):
    ---
    {pdf_text[:8000]}
    ---

    Question: {question}
    """

    model = genai.GenerativeModel("gemini-2.5-flash")

    try:
        response = model.generate_content(context)
        answer = response.text.strip()

        # 💾 Save to Redis with TTL (30 min)
        redis_client.set(ai_key, answer, ex=1800)

        return answer
    except Exception as e:
        return f"[AI Error] {str(e)}"
