import pytest

from apps.users.serializers import UserSerializer
from apps.users.tests.factories import UserFactory


@pytest.mark.django_db
class TestUserSerializer:
    def test_user_serializer(self):
        user = UserFactory()
        serializer = UserSerializer(user)
        assert serializer.data == {
            "id": user.id,
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "role": user.role,
        }
