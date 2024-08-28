from django.urls import path
from .views import imgupload

urlpatterns = [
    path('uploadimg/', imgupload.as_view(), name='image-upload'),
]