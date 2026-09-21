from django.db import migrations


def merge_products(apps, schema_editor):
    Product = apps.get_model("catalog", "Product")
    product_06 = Product.objects.filter(name="Bombón artesanal 06").first()
    product_07 = Product.objects.filter(name="Bombón artesanal 07").first()

    if product_06:
        product_06.price = 14000
        product_06.secondary_image = "products/bombon-artesanal-08.jpeg"
        product_06.save(update_fields=["price", "secondary_image"])

    if product_07:
        product_07.delete()


def reverse_merge(apps, schema_editor):
    Product = apps.get_model("catalog", "Product")
    product_06 = Product.objects.filter(name="Bombón artesanal 06").first()

    if product_06:
        product_06.price = 13000
        product_06.secondary_image = ""
        product_06.save(update_fields=["price", "secondary_image"])
        Product.objects.create(
            name="Bombón artesanal 07",
            description="Chocolate artesanal brasileño elaborado en pequeños lotes.",
            price=15000,
            category="bombons",
            image="products/bombon-artesanal-08.jpeg",
            is_available=True,
        )


class Migration(migrations.Migration):
    dependencies = [("catalog", "0003_seed_products")]

    operations = [migrations.RunPython(merge_products, reverse_merge)]
