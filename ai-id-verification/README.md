# AI ID Verification

Extract structured fields from ID document images using preprocessing and OCR.

## Architecture
See `../diagrams/ai-id-verification.mmd`.

## Features
- ID card upload
- image preprocessing
- OCR extraction
- JSON structured output
- FastAPI endpoint
- Gradio demo

## Setup
```bash
cd ai-id-verification
python -m venv .venv
. .venv/Scripts/activate
pip install -r requirements.txt
```

## Run API
```bash
uvicorn api.main:app --reload --host 0.0.0.0 --port 8000
```

## Run Demo (Gradio)
```bash
python demo/app.py
```

## Example Request
See `examples/requests.http`.

## Docker
```bash
docker build -t ai-id-verification .
docker run -p 8000:8000 ai-id-verification
```

## Output Format
```json
{
  "name": "",
  "id_number": "",
  "date_of_birth": "",
  "expiry_date": ""
}
```
## Deployment
- Hugging Face Spaces (Gradio): see `../docs/deployment.md`
- Render (FastAPI): see `../docs/deployment.md`

## Local Diagram
See `architecture.mmd`.
