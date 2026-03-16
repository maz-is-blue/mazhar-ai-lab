from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)

def test_health():
    res = client.get("/health")
    assert res.status_code == 200


def test_ingest():
    res = client.post("/ingest", json={"text": "I love it"})
    assert res.status_code == 200
    assert "sentiment" in res.json()
