# Generated by Django 5.1.7 on 2025-03-26 13:46

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('slides', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='file',
            name='slides',
        ),
        migrations.AddField(
            model_name='slide',
            name='file',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='slides.file'),
            preserve_default=False,
        ),
    ]
