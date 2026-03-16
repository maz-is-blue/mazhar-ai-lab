import json
from fastapi import FastAPI
from pydantic import BaseModel
from pipeline.utils import infer_sentiment

app = FastAPI(title="AI Data Pipeline Ingestion")

class IngestRequest(BaseModel):
    text: str

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/ingest")
def ingest(payload: IngestRequest):
    record = infer_sentiment(json.dumps({"text": payload.text}))
    return record
