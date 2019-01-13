# Generated by Django 2.1.5 on 2019-01-12 20:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('models', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Promotion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data_posted', models.CharField(max_length=20)),
                ('data_end', models.CharField(max_length=20)),
                ('promotion_message', models.TextField()),
            ],
        ),
        migrations.AddField(
            model_name='restaurant',
            name='latitude',
            field=models.FloatField(default=0.0),
        ),
        migrations.AddField(
            model_name='restaurant',
            name='longitude',
            field=models.FloatField(default=0.0),
        ),
        migrations.AddField(
            model_name='promotion',
            name='restaurant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='models.Restaurant'),
        ),
    ]
