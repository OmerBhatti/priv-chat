import random

from django.template import loader
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token

from core.models import User
from core.api.param_validators import LoginValidator, RegisterValidator, OTPValidator

from cache import CACHE, CACHE_KEYS
from utils import send_email


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

    email = request.data["email"]
    password = request.data["password"]

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

    email = request.data["email"]
    password = request.data["password"]
    first_name = request.data["first_name"]
    last_name = request.data["last_name"]

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


@api_view(["GET"])
def generate_otp(request):
    """
    Generate OTP API.

    :param request:
    :return:
    """
    user = request.user

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

    send_email([user.email], subject, html_body)

    return Response({"detail": f"OTP generated successfully {otp}"}, status=status.HTTP_200_OK)


@api_view(["POST"])
def verify_otp(request):
    """
    Verify OTP API.

    :param request:
    :return:
    """
    validator = OTPValidator(data=request.data)
    validator.is_valid(raise_exception=True)

    user = request.user
    key = CACHE_KEYS['otp'].format(user_id=user.id)
    otp = CACHE.get(key)

    if otp != request.data["otp"]:
        return Response({"detail": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)

    CACHE.delete(key)

    user.is_verified = True
    user.save()

    return Response({"detail": "User verified successfully"}, status=status.HTTP_200_OK)
