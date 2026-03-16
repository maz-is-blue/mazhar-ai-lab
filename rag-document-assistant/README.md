# RAG Document Assistant

Retrieval-augmented QA over uploaded documents.

## Architecture
See `../diagrams/rag-document-assistant.mmd`.

## Setup
```bash
cd rag-document-assistant
python -m venv .venv
. .venv/Scripts/activate
pip install -r requirements.txt
```

## Run (Streamlit)
```bash
streamlit run app/main.py
```

## Run API
```bash
uvicorn api.main:app --reload --host 0.0.0.0 --port 8002
```

## Example Request
See `examples/requests.http`.

## Docker
```bash
docker build -t rag-document-assistant .
docker run -p 8501:8501 rag-document-assistant
```
## Deployment
- Hugging Face Spaces (Streamlit): see `../docs/deployment.md`
- Render (FastAPI): see `../docs/deployment.md`

## Local Diagram
See `architecture.mmd`.
