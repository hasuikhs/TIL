from django.db import models

# Create your models here.
class Job(models.Model):
    name = models.CharField(max_length=40)
    past_job = models.CharField(max_length=40)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # 객체 표시 형식 수정
    def __str__(self):
        return 'f[{self.pk}] {self.name}' 