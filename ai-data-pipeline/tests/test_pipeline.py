from pipeline.utils import infer_sentiment


def test_infer_sentiment():
    rec = infer_sentiment('{"text": "I love this"}')
    assert rec["sentiment"] == "positive"
