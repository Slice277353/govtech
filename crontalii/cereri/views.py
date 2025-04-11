from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Application
from .serializers import ApplicationSerializer
# Create your views here.



class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
