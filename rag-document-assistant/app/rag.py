import hashlib
from typing import List, Tuple


def simple_embed(text: str, dim: int = 128) -> List[float]:
    h = hashlib.sha256(text.encode("utf-8")).digest()
    return [b / 255.0 for b in h[:dim]]


def chunk_text(text: str, size: int = 500) -> List[str]:
    return [text[i:i+size] for i in range(0, len(text), size)]


class RAGEngine:
    def __init__(self):
        self.chunks: List[str] = []
        self.vectors: List[List[float]] = []

    def add_document(self, text: str):
        for chunk in chunk_text(text):
            self.chunks.append(chunk)
            self.vectors.append(simple_embed(chunk))

    def search(self, query: str, k: int = 3) -> List[Tuple[str, float]]:
        qv = simple_embed(query)
        scored = []
        for chunk, vec in zip(self.chunks, self.vectors):
            score = sum(a*b for a,b in zip(qv, vec))
            scored.append((chunk, score))
        scored.sort(key=lambda x: x[1], reverse=True)
        return scored[:k]
