# Generated by Django 2.1.5 on 2019-01-12 15:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('restaurant_name', models.CharField(max_length=100)),
                ('location', models.CharField(max_length=200)),
                ('data_posted', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
