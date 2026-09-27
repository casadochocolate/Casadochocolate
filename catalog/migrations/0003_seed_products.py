from django.db import migrations


PRODUCTS = []


def seed_products(apps, schema_editor):
    Product = apps.get_model("catalog", "Product")
    for name, image, secondary_image, price in PRODUCTS:
        Product.objects.update_or_create(
            name=name,
            defaults={
                "description": "Chocolate artesanal brasileño elaborado en pequeños lotes.",
                "price": price,
                "category": "bombons",
                "image": f"products/{image}",
                "secondary_image": f"products/{secondary_image}" if secondary_image else "",
                "is_available": True,
            },
        )


def remove_products(apps, schema_editor):
    Product = apps.get_model("catalog", "Product")
    Product.objects.filter(name__startswith="Bombón artesanal ").delete()


class Migration(migrations.Migration):
    dependencies = [("catalog", "0002_product_secondary_image")]

    operations = [migrations.RunPython(seed_products, remove_products)]
