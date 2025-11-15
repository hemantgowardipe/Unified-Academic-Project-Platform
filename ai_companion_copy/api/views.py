from django.http import JsonResponse
from core.submission_client import get_all_projects, get_project_by_id
from core.gemini_client import summarize_project
from core.gemini_client import answer_project_question
from django.views.decorators.http import require_GET
from rest_framework.decorators import api_view
from rest_framework.response import Response
from core.redis_client import redis_client

def test_connection(request):
    user_info = getattr(request, "user_info", None)
    if user_info:
        return JsonResponse({
            "message": "AI Companion API is running 🚀",
            "user": user_info
        })
    else:
        return JsonResponse({
            "message": "AI Companion API is running 🚀 (unauthenticated)"
        })


def list_all_projects(request):
    """
    Endpoint: GET /api/ai/projects/
    Fetches all projects from submission_service using user's JWT.
    """
    user_info = getattr(request, "user_info", None)
    if not user_info:
        return JsonResponse({"error": "Unauthorized"}, status=401)

    token = user_info.get("token")
    projects, error = get_all_projects(token)
    if error:
        return error

    return JsonResponse(projects, safe=False)


def get_project_context_view(request, project_id):
    """
    Endpoint: GET /api/ai/projects/<project_id>/
    Fetches a specific project by ID.
    """
    user_info = getattr(request, "user_info", None)
    if not user_info:
        return JsonResponse({"error": "Unauthorized"}, status=401)

    token = user_info.get("token")
    project, error = get_project_by_id(project_id, token)
    if error:
        return error

    return JsonResponse({
        "message": "Project fetched successfully ✅",
        "project_data": project
    })

def summarize_project_view(request, project_id):
    """
    GET /api/ai/projects/<project_id>/summary/
    Fetches project data, sends to Gemini, returns AI summary.
    """
    user_info = getattr(request, "user_info", None)
    if not user_info:
        return JsonResponse({"error": "Unauthorized"}, status=401)

    token = user_info.get("token")
    project, error = get_project_by_id(project_id, token)
    if error:
        return error

    summary = summarize_project(project)

    return JsonResponse({
        "title": project.get("title"),
        "guide": project.get("guideName"),
        "summary": summary
    })

@require_GET
def ask_project_question_view(request, project_id):
    user_info = getattr(request, "user_info", None)
    if not user_info:
        return JsonResponse({"error": "Unauthorized"}, status=401)

    question = request.GET.get("q")
    if not question:
        return JsonResponse({"error": "Missing 'q' parameter"}, status=400)

    token = user_info.get("token")
    project, error = get_project_by_id(project_id, token)
    if error:
        return error

    answer = answer_project_question(project_id, project, question)

    return JsonResponse({
        "project_title": project.get("title"),
        "question": question,
        "answer": answer
    })

@api_view(["GET"])
def redis_test(request):
    try:
        redis_client.set("test_key", "Hello Redis")
        value = redis_client.get("test_key")
        return Response({"message": value})
    except Exception as e:
        return Response({"error": str(e)}, status=500)
