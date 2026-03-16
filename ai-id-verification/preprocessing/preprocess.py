from typing import Any

def preprocess_image(image_bytes: bytes) -> bytes:
    """Preprocess image bytes. Falls back to no-op if OpenCV is unavailable."""
    try:
        import cv2
        import numpy as np
        img_array = np.frombuffer(image_bytes, dtype=np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
        if img is None:
            return image_bytes
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        blur = cv2.GaussianBlur(gray, (3, 3), 0)
        _, thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_OTSU)
        ok, enc = cv2.imencode('.png', thresh)
        return enc.tobytes() if ok else image_bytes
    except Exception:
        return image_bytes
