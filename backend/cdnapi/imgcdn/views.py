from rest_framework import generics
from .serializers import ImageSerializer
from .models import imgmodel


class imgupload(generics.ListCreateAPIView):
    queryset = imgmodel.objects.all()
    serializer_class = ImageSerializer
