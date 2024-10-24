from celery import shared_task

from utils import send_email


@shared_task
def send_email_task(recipients, subject, body):
    """Send email task."""
    return send_email(recipients, subject, body)
