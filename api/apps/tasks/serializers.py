from rest_framework import serializers

from apps.tasks.models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            "id",
            "user",
            "name",
            "description",
            "is_completed",
            "due_date",
            "completed_date",
        ]
        read_only_fields = ["id"]
