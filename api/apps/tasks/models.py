from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.utils.models import TimeStampedModel


class Task(TimeStampedModel):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        verbose_name=_("user"),
        on_delete=models.PROTECT,
    )
    name = models.CharField(max_length=150, verbose_name=_("name"))
    description = models.TextField(verbose_name=_("description"))
    is_completed = models.BooleanField(default=False, verbose_name=_("is completed"))
    due_date = models.DateTimeField(verbose_name=_("due date"))
    completed_date = models.DateTimeField(
        verbose_name=_("completed date"), blank=True, null=True
    )

    class Meta:
        verbose_name = _("task")
        verbose_name_plural = _("tasks")

    def __str__(self):
        return f"{self.name} - {self.user}"
