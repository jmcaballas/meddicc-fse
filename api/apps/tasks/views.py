from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import OrderingFilter

from apps.tasks.models import Task
from apps.tasks.filters import TaskFilter
from apps.tasks.serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = TaskFilter
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
