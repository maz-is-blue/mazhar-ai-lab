from rest_framework.decorators import api_view
from rest_framework.response import Response
from recommender.serializers import PreferenceSerializer
from recommender.services import recommend_trip

@api_view(["POST"])
def recommend(request):
    serializer = PreferenceSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    recs = recommend_trip(serializer.validated_data)
    return Response({"recommendations": recs})
