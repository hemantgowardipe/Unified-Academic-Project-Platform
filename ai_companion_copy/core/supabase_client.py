import os
from supabase import create_client, Client

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def get_project_context(project_id: str):
    """Fetch existing PDF text for this project if available."""
    result = supabase.table("project_contexts").select("pdf_text").eq("project_id", project_id).execute()
    if result.data and len(result.data) > 0:
        return result.data[0]["pdf_text"]
    return None

def store_project_context(project_id: str, text: str):
    """Insert or update PDF text for this project."""
    existing = get_project_context(project_id)
    if existing:
        supabase.table("project_contexts").update({"pdf_text": text}).eq("project_id", project_id).execute()
    else:
        supabase.table("project_contexts").insert({"project_id": project_id, "pdf_text": text}).execute()
