import os
import requests
from django.http import JsonResponse

SUBMISSION_SERVICE_URL = os.getenv("SUBMISSION_SERVICE_URL")

def get_all_projects(token):
    """
    Fetch all projects from submission_service.
    Token is forwarded for authentication.
    """
    try:
        url = f"{SUBMISSION_SERVICE_URL}/api/projects"
        headers = {"Authorization": f"Bearer {token}"}
        print("➡️ Fetching projects from:", url)  # debug
        response = requests.get(url, headers=headers, timeout=25)

        if response.status_code != 200:
            return None, JsonResponse(
                {
                    "error": f"Failed to fetch projects ({response.status_code})",
                    "details": response.text,
                },
                status=response.status_code,
            )

        return response.json(), None

    except requests.exceptions.RequestException as e:
        return None, JsonResponse(
            {"error": f"Submission service unreachable: {str(e)}"}, status=503
        )


def get_project_by_id(project_id, token):
    """
    Fetch a specific project by ID from submission_service.
    Since the API returns all projects, we filter locally.
    """
    projects, error = get_all_projects(token)
    if error:
        return None, error

    project = next((p for p in projects if p.get("id") == project_id), None)
    if not project:
        return None, JsonResponse({"error": "Project not found"}, status=404)

    return project, None
