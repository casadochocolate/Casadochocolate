from pathlib import Path
import shutil

from django.conf import settings
from django.db import migrations
from django.utils.text import slugify


PRODUCTS = [
    {
        "name": "Bombones Florales 12",
        "folder": "bombones florales 12",
        "description": "Caja de 12 bombones florales con presentación premium para regalar.",
        "price": 18000,
        "category": "bombons",
    },
    {
        "name": "Chocolates de Navidad",
        "folder": "chocolates de navidad",
        "description": "Selección festiva con combinaciones navideñas y sabores tradicionales.",
        "price": 22000,
        "category": "bombons",
    },
    {
        "name": "Cuatro (No Florales)",
        "folder": "cuatro (no florales)",
        "description": "Pack de cuatro chocolates artesanales sin flores, ideales para compartir.",
        "price": 15000,
        "category": "bombons",
    },
    {
        "name": "Flores de Chocolate",
        "folder": "flores chocolate",
        "description": "Diseños delicados en chocolate con estilo floral y presentación especial.",
        "price": 16000,
        "category": "bombons",
    },
    {
        "name": "Seis Bombones Florales",
        "folder": "seis bombones florales",
        "description": "Set con seis bombones florales para una entrega elegante y memorable.",
        "price": 17000,
        "category": "bombons",
    },
]


def _copy_image_set(product_name, folder_name):
    media_root = Path(settings.MEDIA_ROOT)
    source_dir = Path(settings.BASE_DIR) / "media" / folder_name
    target_dir = media_root / "products"
    target_dir.mkdir(parents=True, exist_ok=True)

    copied_images = []
    files = sorted(
        [path for path in source_dir.iterdir() if path.is_file() and path.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}],
        key=lambda p: p.name.lower(),
    )

    for index, file_path in enumerate(files, start=1):
        safe_name = f"{slugify(product_name)}-{index}{file_path.suffix.lower()}"
        destination = target_dir / safe_name
        if not destination.exists():
            shutil.copy2(file_path, destination)
        copied_images.append(f"products/{destination.name}")

    return copied_images


def seed_products(apps, schema_editor):
    Product = apps.get_model("catalog", "Product")

    for product_data in PRODUCTS:
        images = _copy_image_set(product_data["name"], product_data["folder"])
        if not images:
            continue

        Product.objects.update_or_create(
            name=product_data["name"],
            defaults={
                "description": product_data["description"],
                "price": product_data["price"],
                "category": product_data["category"],
                "image": images[0],
                "secondary_image": images[1] if len(images) > 1 else "",
                "is_available": True,
            },
        )


def remove_products(apps, schema_editor):
    Product = apps.get_model("catalog", "Product")
    names = [product["name"] for product in PRODUCTS]
    Product.objects.filter(name__in=names).delete()


class Migration(migrations.Migration):
    dependencies = [("catalog", "0004_merge_products_06_07")]

    operations = [migrations.RunPython(seed_products, remove_products)]
