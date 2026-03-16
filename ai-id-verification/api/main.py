from fastapi import FastAPI, File, UploadFile
from api.schemas import IDFields
from preprocessing.preprocess import preprocess_image
from ocr.extract import extract_fields

app = FastAPI(title="AI ID Verification")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/extract", response_model=IDFields)
async def extract_id(file: UploadFile = File(...)):
    image_bytes = await file.read()
    processed = preprocess_image(image_bytes)
    fields = extract_fields(processed)
    return fields
