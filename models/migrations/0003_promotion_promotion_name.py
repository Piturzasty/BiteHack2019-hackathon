# Generated by Django 2.1.5 on 2019-01-12 20:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('models', '0002_auto_20190112_2113'),
    ]

    operations = [
        migrations.AddField(
            model_name='promotion',
            name='promotion_name',
            field=models.TextField(default='Promocja', max_length=100),
        ),
    ]