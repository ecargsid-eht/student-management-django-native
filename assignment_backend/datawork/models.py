from django.db import models

# Create your models here.
class Student(models.Model):
    name = models.CharField(max_length=200)
    academic_marks = models.FloatField()
    sports_points = models.IntegerField()
    
    def __str__(self):
        return self.name


