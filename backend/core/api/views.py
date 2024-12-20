"""Views for core API."""
import random

from django.template import loader
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListCreateAPIView
from rest_framework.authtoken.models import Token

from core.models import User
from core.api.param_validators import LoginValidator, RegisterValidator, OTPValidator
from core.tasks import send_email_task

from cache import CACHE, CACHE_KEYS


@api_view(["POST"])
@permission_classes([])
def login(request):
    """
    Login API.

    :param request:
    :return:
    """
    validator = LoginValidator(data=request.data)
    validator.is_valid(raise_exception=True)

    email = validator.validated_data.get("email")
    password = validator.validated_data.get("password")

    user = User.objects.filter(email=email).first()

    if not user or not user.check_password(password):
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    token, _ = Token.objects.get_or_create(user=user)

    data = {
        "token": token.key,
        "verified": user.is_verified,
        "full_name": user.full_name,
        "email": user.email
    }

    return Response(data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([])
def register(request):
    """
    Register API.

    :param request:
    :return:
    """
    validator = RegisterValidator(data=request.data)
    validator.is_valid(raise_exception=True)

    email = validator.validated_data.get("email")
    password = validator.validated_data.get("password")
    first_name = validator.validated_data.get("first_name")
    last_name = validator.validated_data.get("last_name")

    if User.objects.filter(email=email).exists():
        return Response({"detail": "User already exists"}, status=status.HTTP_409_CONFLICT)

    user = User.objects.create_user(
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name
    )
    user.save()

    token, _ = Token.objects.get_or_create(user=user)

    return Response({"token": token.key}, status=status.HTTP_201_CREATED)


@api_view(["get"])
def logout(request):
    """
    Logout API.

    :param request:
    :return:
    """
    request.user.auth_token.delete()
    return Response({"detail": "Logged out successfully"}, status=status.HTTP_200_OK)


class UserVerificationView(ListCreateAPIView):
    """Account verification API."""
    def list(self, request, *args, **kwargs):
        """Send verify account email."""
        user = request.user

        if user.is_verified:
            return Response({"detail": "User already verified"}, status=status.HTTP_400_BAD_REQUEST)

        key = CACHE_KEYS['otp'].format(user_id=user.id)

        otp = CACHE.get(key)
        if otp is None:
            otp = random.randint(100000, 999999)
            CACHE.set(key, otp, timeout=300)

        subject = "Verify your account"
        context = {
            "full_name": user.full_name,
            "otp": otp
        }
        html_body = loader.render_to_string("verify_account.html", context=context)

        send_email_task.delay([user.email], subject, html_body)

        return Response({"detail": "Account verification OTP sent."}, status=status.HTTP_200_OK)
    
    def create(self, request, *args, **kwargs):
        """Verify account API."""
        validator = OTPValidator(data=request.data)
        validator.is_valid(raise_exception=True)

        input_otp = validator.validated_data["otp"]

        user = request.user
        key = CACHE_KEYS['otp'].format(user_id=user.id)
        otp = CACHE.get(key)

        if otp != input_otp:
            return Response({"detail": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)

        CACHE.delete(key)

        user.is_verified = True
        user.save()

        return Response({"detail": "User verified successfully"}, status=status.HTTP_200_OK)
