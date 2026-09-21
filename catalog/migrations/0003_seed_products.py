from django.db import migrations


PRODUCTS = [
    ("Bombón artesanal 01", "bombon-artesanal-01.jpeg", None, 8000),
    ("Bombón artesanal 02", "bombon-artesanal-02.jpeg", "bombon-artesanal-03.jpeg", 9000),
    ("Bombón artesanal 03", "bombon-artesanal-04.jpeg", None, 10000),
    ("Bombón artesanal 04", "bombon-artesanal-05.jpeg", "bombon-artesanal-09.jpeg", 11000),
    ("Bombón artesanal 05", "bombon-artesanal-06.jpeg", None, 12000),
    ("Bombón artesanal 06", "bombon-artesanal-07.jpeg", None, 13000),
    ("Bombón artesanal 07", "bombon-artesanal-08.jpeg", None, 15000),
]


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
