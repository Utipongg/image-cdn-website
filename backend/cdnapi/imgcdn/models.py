from django.db import models
import string
import random
import os
from django.core.exceptions import ValidationError

class imgmodel(models.Model):
    image = models.ImageField(upload_to='image/')
    code = models.CharField(max_length=15, unique=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)


    # def clean(self):
    #     if not self.image:
    #         raise ValidationError("No image provided")
    #     if not self.image.name.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
    #         raise ValidationError("File is not an image")
        
    def save(self, *args, **kwargs):
        if not self.code:
            self.generate_short_code()
        super().save(*args, **kwargs)

    def generate_short_code(self):
        while True:
            code = ''.join(random.choice(string.ascii_letters) for _ in range(15))
            if not imgmodel.objects.filter(code=code).exists():
                self.code = code
                break

        # Set the image file name to the generated code
        if self.image:
            original_extension = os.path.splitext(self.image.name)[1]
            self.image.name = f'{self.code}{original_extension}'

    