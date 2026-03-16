# AI Data Pipeline

Streaming AI data pipeline with sentiment inference and BigQuery ingestion.

## Architecture
See `../diagrams/ai-data-pipeline.mmd`.

## Setup
```bash
cd ai-data-pipeline
python -m venv .venv
. .venv/Scripts/activate
pip install -r requirements.txt
```

## Run (DirectRunner)
```bash
python pipeline/streaming.py
```

## API (Optional Ingestion)
```bash
uvicorn api.main:app --reload --host 0.0.0.0 --port 8001
```

## Example Request
See `examples/requests.http`.

## Docker
```bash
docker build -t ai-data-pipeline .
docker run ai-data-pipeline
```
## Deployment
- Render (FastAPI ingestion): see `../docs/deployment.md`
- Dataflow/BigQuery deployment: see `../docs/deployment.md`

## Local Diagram
See `architecture.mmd`.
