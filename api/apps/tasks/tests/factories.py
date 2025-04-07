from datetime import timezone

from factory import Faker, Sequence, SubFactory

from apps.utils.factories import TimeStampedModelFactory
from apps.users.tests.factories import UserFactory
from apps.tasks.models import Task


class TaskFactory(TimeStampedModelFactory):
    user = SubFactory(UserFactory)
    name = Sequence(lambda n: f"task{n}")
    description = Faker("paragraph")
    is_completed = Faker("boolean")
    due_date = Faker("date_time_this_year", tzinfo=timezone.utc)
    completed_date = Faker("date_time_this_year", tzinfo=timezone.utc)

    class Meta:
        model = Task
