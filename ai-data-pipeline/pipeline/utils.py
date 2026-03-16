import json
from textblob import TextBlob


def infer_sentiment(line: str):
    record = json.loads(line)
    text = record.get("text", "")
    polarity = TextBlob(text).sentiment.polarity
    record["sentiment"] = "positive" if polarity >= 0 else "negative"
    return record
