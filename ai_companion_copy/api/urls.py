from django.urls import path
from . import views

urlpatterns = [
    path('test/', views.test_connection),
    path('projects/', views.list_all_projects),
    path('projects/<str:project_id>/', views.get_project_context_view),
    path('projects/<str:project_id>/summary/', views.summarize_project_view),
    path('projects/<str:project_id>/ask/', views.ask_project_question_view),
    path("redis-test/", views.redis_test),
]
