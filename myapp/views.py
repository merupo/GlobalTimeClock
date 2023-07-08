from django.shortcuts import render

# Create your views here.
import pytz
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TimezoneConversion
from .serializers import TimezoneConversionSerializer
from datetime import datetime

class TimezoneConversionView(APIView):
    def post(self, request, format=None):
        original_timezone = request.data.get('timezone')
        if not original_timezone:
            return Response({'error': 'Please provide a timezone.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_timezone = pytz.timezone(original_timezone)
        except pytz.UnknownTimeZoneError:
            return Response({'error': 'Invalid timezone.'}, status=status.HTTP_400_BAD_REQUEST)

        hongkong_timezone = pytz.timezone('Asia/Hong_Kong')
        india_timezone = pytz.timezone('Asia/Kolkata')
        usa_timezone = pytz.timezone('America/New_York')

        hongkong_time = user_timezone.localize(datetime.now()).astimezone(hongkong_timezone)
        india_time = user_timezone.localize(datetime.now()).astimezone(india_timezone)
        usa_time = user_timezone.localize(datetime.now()).astimezone(usa_timezone)

        conversion_data = {
            'original_timezone': original_timezone,
            'hongkong_time': hongkong_time,
            'india_time': india_time,
            'usa_time': usa_time,
        }

        serializer = TimezoneConversionSerializer(data=conversion_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
