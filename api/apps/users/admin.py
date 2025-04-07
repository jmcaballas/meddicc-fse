from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (
            "Additional Info",
            {
                "fields": ("role",),
            },
        ),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        (
            "Additional Info",
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "email",
                    "role",
                ),
            },
        ),
    )

    list_display = UserAdmin.list_display + ("role",)


admin.site.register(User, CustomUserAdmin)
