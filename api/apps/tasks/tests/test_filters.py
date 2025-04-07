import pytest

from apps.tasks.filters import TaskFilter
from apps.tasks.models import Task
from apps.tasks.tests.factories import TaskFactory
from apps.users.tests.factories import UserFactory


@pytest.mark.django_db
class TestTaskFilter:
    def test_filter_by_name(self):
        task1 = TaskFactory(name="Test Task 1")
        TaskFactory(name="Test Task 2")

        expected_ids = {task1.id}

        queryset = Task.objects.all()
        filtered_queryset = TaskFilter(
            data={"task_name": "Test Task 1"}, queryset=queryset
        ).qs

        assert set(filtered_queryset.values_list("id", flat=True)) == expected_ids

    def test_filter_by_user_id(self):
        user1 = UserFactory()
        user2 = UserFactory()

        task1 = TaskFactory(user=user1)
        TaskFactory(user=user2)

        expected_ids = {task1.id}

        queryset = Task.objects.all()
        filtered_queryset = TaskFilter(data={"user_id": user1.id}, queryset=queryset).qs

        assert set(filtered_queryset.values_list("id", flat=True)) == expected_ids

    def test_filter_by_user_username(self):
        user1 = UserFactory(username="testuser1")
        user2 = UserFactory(username="testuser2")

        task1 = TaskFactory(user=user1)
        TaskFactory(user=user2)

        expected_ids = {task1.id}

        queryset = Task.objects.all()
        filtered_queryset = TaskFilter(
            data={"user_username": user1.username}, queryset=queryset
        ).qs

        assert set(filtered_queryset.values_list("id", flat=True)) == expected_ids

    def test_filter_by_is_completed(self):
        task1 = TaskFactory(is_completed=True)
        TaskFactory(is_completed=False)

        expected_ids = {task1.id}

        queryset = Task.objects.all()
        filtered_queryset = TaskFilter(
            data={"is_completed": True}, queryset=queryset
        ).qs

        assert set(filtered_queryset.values_list("id", flat=True)) == expected_ids
