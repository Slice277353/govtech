from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class Application(models.Model):
    OWNER_TYPE_CHOICES = [
        ('fizic', 'fizic'),
        ('juridic', 'juridic'),
    ]

    order_number = models.CharField(max_length=20)
    mpay_code = models.CharField(max_length=30, blank=True, null=True)

    owner_name = models.CharField(max_length=100)
    IDNP = models.CharField(max_length=13, unique=True)
    phone_number = models.CharField(max_length=20)
    owner_type = models.CharField(max_length=10, choices=OWNER_TYPE_CHOICES, default='fizic')

    VAT_code = models.CharField(max_length=13, blank=True, null=True)
    region = models.CharField(max_length=50)
    exploitation_code = models.CharField(max_length=20)

    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Comanda {self.order_number} - {self.owner_name}"
