from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)

def test_health():
    res = client.get("/health")
    assert res.status_code == 200


def test_query():
    res = client.post("/query", json={"document_text": "Hello world", "question": "Hello?"})
    assert res.status_code == 200
    assert "results" in res.json()
