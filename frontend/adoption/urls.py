from django.urls import path, include
from . import views

urlpatterns = [

    path('', views.home, name='home'),
    path('shop', views.shop, name='shop'),
    path('pet', views.pet, name='pet'),
]