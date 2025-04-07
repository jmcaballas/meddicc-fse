import pytest

from apps.users.tests.factories import UserFactory
from apps.tasks.models import Task
from .factories import TaskFactory


@pytest.mark.django_db
class TestTask:
    def test_all_fields(self):
        user = UserFactory.create()
        task = TaskFactory.create(user=user)

        db_task = Task.objects.get(pk=task.pk)
        assert db_task.user.id == user.id
        assert db_task.name == task.name
        assert db_task.description == task.description
        assert db_task.is_completed == task.is_completed
        assert db_task.due_date == task.due_date
        assert db_task.completed_date == task.completed_date
