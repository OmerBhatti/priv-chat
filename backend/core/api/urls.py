from django.urls import path

from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('generate-otp/', views.generate_otp, name='generate-otp'),
    path('verify-otp/', views.verify_otp, name='verify-otp'),
    path('logout/', views.logout, name='logout'),
]
