import re
from pathlib import Path

from django.conf import settings
from django.db import models
from django.urls import reverse
from django.utils.text import slugify


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
    def gallery_images(self):
        media_root = Path(settings.MEDIA_ROOT)
        products_dir = media_root / "products"

        def sort_key(path):
            match = re.search(r"(\d+)(?:\.\w+)?$", path.stem)
            number = int(match.group(1)) if match else 999999
            return (number, path.name.lower())

        aliases = {
            "Cuatro (No Florales)": ["4bom"],
            "Seis Bombones Florales": ["6bom"],
            "Bombones Florales 12": ["12bom"],
            "Flores de Chocolate": ["florcho"],
            "Chocolates de Navidad": ["navidad", "nav"],
        }

        patterns = []
        for key, values in aliases.items():
            if self.name == key:
                patterns.extend(values)
                break

        if not patterns:
            patterns = [slugify(self.name), slugify(self.name).replace("-", "")]

        custom_files = []
        if products_dir.exists():
            for file_path in products_dir.iterdir():
                if not file_path.is_file():
                    continue
                if file_path.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
                    continue
                stem = file_path.stem.lower()
                if any(stem.startswith(pattern.lower()) for pattern in patterns):
                    custom_files.append(file_path)

        if custom_files:
            selected_files = sorted(custom_files, key=sort_key)
            return [
                f"{settings.MEDIA_URL}{file_path.relative_to(media_root).as_posix()}"
                for file_path in selected_files
            ]

        urls = []
        for image_field in (self.image, self.secondary_image):
            if image_field and image_field.name:
                url = image_field.url
                if url not in urls:
                    urls.append(url)

        if not urls and self.image:
            return [self.image.url]

        return urls

    @property
    def category_label(self):
        return self.get_category_display()
