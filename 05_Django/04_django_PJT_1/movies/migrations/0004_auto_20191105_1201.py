# Generated by Django 2.2.7 on 2019-11-05 03:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0003_comment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='score',
            field=models.IntegerField(),
        ),
    ]
