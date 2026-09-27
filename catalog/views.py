from collections import OrderedDict

from django.conf import settings
from django.shortcuts import render

from .models import Product


def category_label_for_product(product):
    if product.name == "Chocolates de Navidad":
        return "Navidad"
    return product.category_label


def menu(request):
    products_by_category = OrderedDict()
    products = Product.objects.filter(is_available=True).order_by("category", "price", "name")

    for product in products:
        products_by_category.setdefault(category_label_for_product(product), []).append(product)

    ordered_labels = ["Bombons", "Navidad"]
    reordered = OrderedDict()
    for label in ordered_labels:
        if label in products_by_category:
            reordered[label] = products_by_category.pop(label)
    for label, items in products_by_category.items():
        reordered[label] = items

    return render(
        request,
        "catalog/menu.html",
        {
            "products_by_category": reordered,
            "whatsapp_url": settings.WHATSAPP_URL,
        },
    )
