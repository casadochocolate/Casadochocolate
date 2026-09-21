from collections import OrderedDict

from django.conf import settings
from django.shortcuts import render

from .models import Product


def menu(request):
    products_by_category = OrderedDict()
    products = Product.objects.filter(is_available=True).order_by("category", "name")

    for product in products:
        products_by_category.setdefault(product.category_label, []).append(product)

    return render(
        request,
        "catalog/menu.html",
        {
            "products_by_category": products_by_category,
            "whatsapp_url": settings.WHATSAPP_URL,
        },
    )
