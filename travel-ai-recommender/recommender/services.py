import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity

DATA_PATH = "data/sample_trips.csv"


def load_data():
    return pd.read_csv(DATA_PATH)


def build_features(df):
    features = df[["budget", "beach", "culture", "adventure"]].copy()
    scaler = MinMaxScaler()
    features = scaler.fit_transform(features)
    return features, scaler


def recommend_trip(preferences: dict, top_k: int = 3):
    df = load_data()
    features, scaler = build_features(df)
    user_vec = scaler.transform([[
        preferences["budget"],
        preferences["beach"],
        preferences["culture"],
        preferences["adventure"],
    ]])
    scores = cosine_similarity(user_vec, features)[0]
    df["score"] = scores
    df = df.sort_values("score", ascending=False)
    return df.head(top_k)[["destination", "score"]].to_dict(orient="records")
