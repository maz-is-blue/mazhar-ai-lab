from rest_framework import serializers

class PreferenceSerializer(serializers.Serializer):
    budget = serializers.FloatField()
    beach = serializers.IntegerField()
    culture = serializers.IntegerField()
    adventure = serializers.IntegerField()
    season = serializers.CharField()
