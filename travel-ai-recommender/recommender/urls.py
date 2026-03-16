from django.urls import path
from recommender.views import recommend

urlpatterns = [
    path("recommend/", recommend),
]
