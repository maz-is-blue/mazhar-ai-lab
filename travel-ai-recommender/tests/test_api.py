from django.test import TestCase
from rest_framework.test import APIClient


class RecommendationApiTest(TestCase):
    def test_recommend_endpoint(self):
        client = APIClient()
        payload = {"budget": 1500, "beach": 1, "culture": 0, "adventure": 1, "season": "summer"}
        res = client.post("/api/recommend/", payload, format="json")
        assert res.status_code == 200
        assert "recommendations" in res.json()
