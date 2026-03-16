from fastapi import FastAPI
from pydantic import BaseModel
from app.rag import RAGEngine

app = FastAPI(title="RAG Document Assistant API")

class QueryRequest(BaseModel):
    document_text: str
    question: str

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/query")
def query(payload: QueryRequest):
    engine = RAGEngine()
    engine.add_document(payload.document_text)
    results = engine.search(payload.question, k=3)
    return {"results": [{"score": s, "context": c} for c, s in results]}
