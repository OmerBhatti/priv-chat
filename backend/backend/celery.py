from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')

app.config_from_object('django.conf:settings', namespace='CELERY')

# Automatically discover tasks from installed apps
app.autodiscover_tasks()

# Optional: Add a test task to verify Celery is working
@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
