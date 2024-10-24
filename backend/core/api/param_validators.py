from rest_framework import serializers


class ValidationSerializer(serializers.Serializer):
    """Parent class for validation serializers that override abstract requires methods."""

    def update(self, instance, validated_data):
        """
        Empty override of serializer update method.

        :param instance:
        :param validated_data:
        :return:
        """

    def create(self, validated_data):
        """
        Empty override of serializer create method.

        :param validated_data:
        :return:
        """


class LoginValidator(ValidationSerializer):
    """Login validator."""

    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(max_length=255)


class RegisterValidator(ValidationSerializer):
    """Register validator."""

    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(max_length=255)
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)


class OTPValidator(ValidationSerializer):
    """OTP Confirmation validator."""

    otp = serializers.CharField(max_length=8)
