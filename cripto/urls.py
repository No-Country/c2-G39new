from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('register', index),
    path('contact', index),
    path('login', index),
    path('dashboard', index),
]

