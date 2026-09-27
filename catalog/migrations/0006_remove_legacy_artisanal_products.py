from django.db import migrations


def remove_legacy_products(apps, schema_editor):
    Product = apps.get_model("catalog", "Product")
    Product.objects.filter(name__startswith="Bombón artesanal ").delete()


def reverse_remove_legacy_products(apps, schema_editor):
    # This is a data cleanup migration; reverse action is intentionally empty.
    pass


class Migration(migrations.Migration):
    dependencies = [("catalog", "0005_seed_new_product_collection")]

    operations = [migrations.RunPython(remove_legacy_products, reverse_remove_legacy_products)]
