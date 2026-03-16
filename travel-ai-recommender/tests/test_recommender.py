from recommender.services import recommend_trip


def test_recommend_trip():
    prefs = {"budget": 1500, "beach": 1, "culture": 0, "adventure": 1, "season": "summer"}
    recs = recommend_trip(prefs)
    assert isinstance(recs, list)
    assert len(recs) > 0
