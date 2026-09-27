from django.db import migrations


def update_prices_and_descriptions(apps, schema_editor):
    Product = apps.get_model("catalog", "Product")

    updates = {
        "Bombones Florales 12": {
            "price": 8500,
            "description": "Caja de 12 bombones florales con presentación premium para regalar. Opción sin flores: $7.500.",
        },
        "Chocolates de Navidad": {
            "price": 0,
            "description": "Selección festiva con combinaciones navideñas y sabores tradicionales. Precio por definir.",
        },
        "Cuatro (No Florales)": {
            "price": 3000,
            "description": "Pack de cuatro chocolates artesanales sin flores, ideales para compartir.",
        },
        "Flores de Chocolate": {
            "price": 15000,
            "description": "Diseños delicados en chocolate con estilo floral y presentación especial.",
        },
        "Seis Bombones Florales": {
            "price": 5000,
            "description": "Set con seis bombones florales para una entrega elegante y memorable. Opción sin flores: $4.000.",
        },
    }

    for product_name, values in updates.items():
        Product.objects.filter(name=product_name).update(
            price=values["price"],
            description=values["description"],
        )


def reverse_update_prices_and_descriptions(apps, schema_editor):
    Product = apps.get_model("catalog", "Product")
    Product.objects.filter(name="Bombones Florales 12").update(price=18000, description="Caja de 12 bombones florales con presentación premium para regalar.")
    Product.objects.filter(name="Chocolates de Navidad").update(price=22000, description="Selección festiva con combinaciones navideñas y sabores tradicionales.")
    Product.objects.filter(name="Cuatro (No Florales)").update(price=15000, description="Pack de cuatro chocolates artesanales sin flores, ideales para compartir.")
    Product.objects.filter(name="Flores de Chocolate").update(price=16000, description="Diseños delicados en chocolate con estilo floral y presentación especial.")
    Product.objects.filter(name="Seis Bombones Florales").update(price=17000, description="Set con seis bombones florales para una entrega elegante y memorable.")


class Migration(migrations.Migration):
    dependencies = [("catalog", "0006_remove_legacy_artisanal_products")]

    operations = [migrations.RunPython(update_prices_and_descriptions, reverse_update_prices_and_descriptions)]
