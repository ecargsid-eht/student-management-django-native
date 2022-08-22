from django.shortcuts import render
from rest_framework import generics

from .serializers import StudentSerializer
from .models import Student
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.

class StudentView(generics.ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

@api_view(["GET", ])
def studentDetailView(r,id):
    student = Student.objects.get(id=id)
    serializer = StudentSerializer(student)
    return Response(serializer.data)

@api_view(["POST"])
def createStudent(r):
    serializer = StudentSerializer(data=r.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(["DELETE"])
def deleteStudent(r,id):
    student = Student.objects.get(id=id)
    student.delete()
    return Response("data deleted successfully")


        



