# Travel AI Recommender

Personalized travel recommendations with a Django REST API and ML ranking.

## Architecture
See `../diagrams/travel-ai-recommender.mmd`.

## Setup
```bash
cd travel-ai-recommender
python -m venv .venv
. .venv/Scripts/activate
pip install -r requirements.txt
```

## Run
```bash
python manage.py migrate
python manage.py runserver
```

## Example Request
```bash
curl -X POST http://127.0.0.1:8000/api/recommend/ \
  -H "Content-Type: application/json" \
  -d '{"budget": 1500, "beach": 1, "culture": 0, "adventure": 1, "season": "summer"}'
```

## Docker
```bash
docker build -t travel-ai-recommender .
docker run -p 8000:8000 travel-ai-recommender
```
## Deployment
- Render (Django): see `../docs/deployment.md`

## Local Diagram
See `architecture.mmd`.
