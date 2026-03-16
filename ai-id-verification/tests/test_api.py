from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)

def test_health():
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json()["status"] == "ok"


def test_extract():
    res = client.post(
        "/extract",
        files={"file": ("test.png", b"fake-image", "image/png")},
    )
    assert res.status_code == 200
    body = res.json()
    assert set(body.keys()) == {"name", "id_number", "date_of_birth", "expiry_date"}
