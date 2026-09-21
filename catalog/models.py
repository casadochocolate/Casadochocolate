from django.db import models
from django.urls import reverse


class Product(models.Model):
    CATEGORY_CHOICES = [
        ("bombons", "Bombons"),
        ("tabletes", "Tabletes"),
        ("presentes", "Presentes"),
        ("especiais", "Especiais"),
    ]

    name = models.CharField("nombre", max_length=120)
    description = models.TextField("descripción", blank=True)
    price = models.DecimalField("precio", max_digits=8, decimal_places=2)
    category = models.CharField("categoría", max_length=20, choices=CATEGORY_CHOICES)
    image = models.ImageField("foto", upload_to="products/")
    secondary_image = models.ImageField("foto alternativa", upload_to="products/", blank=True)
    is_available = models.BooleanField("disponible", default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["category", "name"]
        verbose_name = "producto"
        verbose_name_plural = "productos"

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("catalog:menu")

    @property
    def category_label(self):
        return self.get_category_display()
