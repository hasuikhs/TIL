# Generated by Django 2.2.7 on 2019-11-05 05:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0005_comment_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='image',
        ),
        migrations.AddField(
            model_name='article',
            name='image',
            field=models.ImageField(blank=True, upload_to=''),
        ),
    ]