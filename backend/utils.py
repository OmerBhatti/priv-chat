"""
Utils module.

This module contains all the utils related functions.
"""
import os

from django.core.mail import send_mail
from django.conf import settings

import certifi

os.environ['SSL_CERT_FILE'] = certifi.where()


def send_email(recipients, subject, body):
    """Send email."""
    send_mail(
        subject,
        body,
        settings.EMAIL_HOST_USER,
        recipients,
        fail_silently=False,
        html_message=body
    )

    return True
