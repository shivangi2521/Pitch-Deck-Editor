from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import SlideViewSet

# Router to automatically handle CRUD routes for SlideViewSet
router = DefaultRouter()
router.register(
    r"slides", SlideViewSet
)  # Registering SlideViewSet with "slides" URL prefix

# URL patterns for the Django project
urlpatterns = [
    path("", include(router.urls)),  # Including the router-generated URLs
]
