from django.urls import include, path


urlpatterns = [
    path("auth/", include("apps.authentication.urls")),
    path("tasks/", include("apps.tasks.urls")),
    path("users/", include("apps.users.urls")),
]
