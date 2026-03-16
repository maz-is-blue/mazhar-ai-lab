from typing import Dict

DEFAULT_FIELDS = {
    "name": "",
    "id_number": "",
    "date_of_birth": "",
    "expiry_date": "",
}

def extract_fields(image_bytes: bytes) -> Dict[str, str]:
    """Extract fields via OCR. Uses a safe fallback if Tesseract is unavailable."""
    try:
        from PIL import Image
        import pytesseract
        from io import BytesIO
        image = Image.open(BytesIO(image_bytes))
        text = pytesseract.image_to_string(image)
        return _parse_text(text)
    except Exception:
        return DEFAULT_FIELDS.copy()

def _parse_text(text: str) -> Dict[str, str]:
    # Simple heuristic parsing for demo purposes
    fields = DEFAULT_FIELDS.copy()
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    for line in lines:
        lower = line.lower()
        if "name" in lower and fields["name"] == "":
            fields["name"] = line.split(":")[-1].strip()
        if ("id" in lower or "number" in lower) and fields["id_number"] == "":
            fields["id_number"] = line.split(":")[-1].strip()
        if "birth" in lower and fields["date_of_birth"] == "":
            fields["date_of_birth"] = line.split(":")[-1].strip()
        if "expiry" in lower and fields["expiry_date"] == "":
            fields["expiry_date"] = line.split(":")[-1].strip()
    return fields
