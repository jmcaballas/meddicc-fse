import pytest
from rest_framework import status

from apps.tasks.tests.factories import TaskFactory
from apps.utils.test_models import TestModel


@pytest.mark.django_db
class TestTaskViewSet(TestModel):
    namespace = "tasks:tasks-list"

    def test_list_unauthenticated(self, api_client):
        response = api_client.get(self.get_url())

        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_list_non_admin(self, api_client, user):
        api_client.force_authenticate(user)
        response = api_client.get(self.get_url())

        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_list(self, api_client, admin_user):
        task1 = TaskFactory()
        task2 = TaskFactory()
        expected_ids = [task1.pk, task2.pk]

        api_client.force_authenticate(admin_user)
        response = api_client.get(self.get_url())

        ids = [item["id"] for item in response.data["results"]]

        assert response.status_code == status.HTTP_200_OK
        assert set(expected_ids) == set(ids)
