from app.rag import RAGEngine


def test_rag_search():
    eng = RAGEngine()
    eng.add_document("Hello world. This is a test document.")
    results = eng.search("test")
    assert len(results) > 0
