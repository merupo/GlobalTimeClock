# Generated by Django 4.2.2 on 2023-07-06 21:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TimezoneConversion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('original_timezone', models.CharField(max_length=100)),
                ('hongkong_time', models.DateTimeField(blank=True, null=True)),
                ('india_time', models.DateTimeField(blank=True, null=True)),
                ('usa_time', models.DateTimeField(blank=True, null=True)),
            ],
        ),
    ]
