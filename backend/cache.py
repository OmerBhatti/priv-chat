"""
Cache module.

This module contains all the cache related functions.
"""
from django.core.cache import cache

CACHE_KEYS = {
    "otp": "otp_{user_id}",
}


class CACHE:
    """
    Cache class.

    This class contains all the cache related functions.
    """
    @staticmethod
    def get(key):
        """Get value from cache."""
        return cache.get(key)

    @staticmethod
    def set(key, value, timeout=None):
        """Set value in cache."""
        cache.set(key, value, timeout=timeout)

    @staticmethod
    def get_or_set(key, value, timeout=None):
        """Get value from cache or set value in cache."""
        return cache.get_or_set(key, value, timeout=timeout)

    @staticmethod
    def delete(key):
        """Delete value from cache."""
        cache.delete(key)

    @staticmethod
    def clear():
        """Clear cache."""
        cache.clear()
