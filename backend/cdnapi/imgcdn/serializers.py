from rest_framework import serializers
from .models import imgmodel

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = imgmodel
        fields = ('id', 'image', 'code', 'uploaded_at')

    # def validate_image(self, value):
    #     if not value.name.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
    #         raise serializers.ValidationError("Only image files are allowed.")
    #     return value