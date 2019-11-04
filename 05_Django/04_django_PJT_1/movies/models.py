from django.db import models

# Create your models here.
class Movie(models.Model):
    title = models.CharField(max_length=100)    # CharField는 max_length가 필수
    title_en = models.CharField(max_length=100)
    audience = models.IntegerField()
    open_date = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)
    watch_grade = models.CharField(max_length=20)
    score = models.FloatField()
    poster_url = models.TextField()
    description = models.TextField()

    # 객체 표시 형식 수정
    def __str__(self):
        return f'[{self.pk}] {self.title}'
