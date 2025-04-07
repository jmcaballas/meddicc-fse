from django.urls import include, path
from rest_framework.routers import SimpleRouter

from apps.tasks.views import TaskViewSet


app_name = "tasks"

router = SimpleRouter()
router.register(r"", TaskViewSet, basename="tasks")

urlpatterns = [
    path("", include(router.urls)),
]
