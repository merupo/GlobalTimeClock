from django.db import models

# Create your models here.
class TimezoneConversion(models.Model):
    original_timezone = models.CharField(max_length=100)
    hongkong_time = models.DateTimeField(null=True, blank=True)
    india_time = models.DateTimeField(null=True, blank=True)
    usa_time = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.original_timezone
