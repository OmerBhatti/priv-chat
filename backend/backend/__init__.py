"""
backend/__init__.py

This file contains the main entry point for the Django application.
"""
from __future__ import absolute_import, unicode_literals
from .celery import app as celery_app

__all__ = ('celery_app',)
