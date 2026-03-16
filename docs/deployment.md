# Deployment Guides

## Hugging Face Spaces (Gradio / Streamlit)
1. Create a new Space (Gradio or Streamlit).
2. Add the project folder contents.
3. Ensure `requirements.txt` is present.
4. Set environment variables in the Space settings.

## Render (FastAPI / Django)
1. Create a new Web Service.
2. Connect the repository and select the project folder.
3. Set build command (e.g., `pip install -r requirements.txt`).
4. Set start command (e.g., `uvicorn api.main:app --host 0.0.0.0 --port 8000`).
5. Add environment variables.
