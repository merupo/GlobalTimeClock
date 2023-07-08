from rest_framework import serializers
from .models import TimezoneConversion

class TimezoneConversionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimezoneConversion
        fields = '__all__'
