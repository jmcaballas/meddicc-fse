import django_filters

from apps.tasks.models import Task


class TaskFilter(django_filters.FilterSet):
    task_name = django_filters.CharFilter(field_name="name", lookup_expr="iexact")
    user_id = django_filters.NumberFilter(field_name="user__id")
    user_username = django_filters.CharFilter(
        field_name="user__username", lookup_expr="iexact"
    )
    is_completed = django_filters.BooleanFilter(field_name="is_completed")

    class Meta:
        model = Task
        fields = [
            "task_name",
            "user_id",
            "user_username",
            "is_completed",
        ]
