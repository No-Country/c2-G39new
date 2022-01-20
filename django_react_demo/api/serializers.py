from rest_framework import serializers
from api.models import User_model, Perfil, Billetera
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


class UserModelSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = User_model
        fields = ['user']


class PerfilSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Perfil
        fields = '__all__'


class BilleteraSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Billetera
        fields = '__all__'