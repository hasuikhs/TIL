from django.db import models

# Create your models here.
class Student(models.Model):
    name = models.CharField(max_length=40)
    birth = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'[{self.pk}] {self.name}'