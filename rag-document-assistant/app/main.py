import streamlit as st
from app.rag import RAGEngine
from pypdf import PdfReader

engine = RAGEngine()

st.title("RAG Document Assistant")

uploaded = st.file_uploader("Upload PDF", type=["pdf"])
if uploaded:
    reader = PdfReader(uploaded)
    text = "\n".join(page.extract_text() or "" for page in reader.pages)
    engine.add_document(text)
    st.success("Document indexed.")

question = st.text_input("Ask a question")
if question:
    results = engine.search(question, k=3)
    st.write("Top matches:")
    for chunk, score in results:
        st.write({"score": score, "context": chunk[:500]})
