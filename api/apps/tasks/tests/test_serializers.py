import pytest

from apps.tasks.serializers import TaskSerializer
from apps.tasks.tests.factories import TaskFactory


@pytest.mark.django_db
class TestTaskSerializer:
    def test_task_serializer(self):
        task = TaskFactory()
        serializer = TaskSerializer(task)
        assert serializer.data == {
            "id": task.id,
            "user": task.user.id,
            "name": task.name,
            "description": task.description,
            "is_completed": task.is_completed,
            "due_date": task.due_date.isoformat().replace("+00:00", "Z"),
            "completed_date": task.completed_date.isoformat().replace("+00:00", "Z"),
        }
