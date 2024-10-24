"""URLs for core API."""
from django.urls import path

from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('verify/', views.UserVerificationView.as_view(), name='verify-otp'),
    path('logout/', views.logout, name='logout'),
]
