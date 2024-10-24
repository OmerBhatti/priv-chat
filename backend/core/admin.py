from django.contrib import admin

from core.models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    """User admin."""

    list_display = ("email", "full_name", "is_active", "is_staff")
    list_filter = ("is_staff", "is_active")
    search_fields = ("email", "full_name")
