from django.urls import path
from .views import *

urlpatterns = [
    path('products/', get_products),
    path('add-products/', add_products),
    path('bulk-add-products/', bulk_add_products),
    path('register/', register_user),
    path('login/', login_user),
]