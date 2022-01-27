from rest_framework import viewsets
from api.serializers import UserModelSerializer, UserSerializer, PerfilSerializer, BilleteraSerializer
from api.models import User_model, Billetera, Perfil
from django.contrib.auth.models import User

# Create your views here.
class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserModelViewset(viewsets.ModelViewSet):
    queryset = User_model.objects.all()
    serializer_class = UserModelSerializer


class PerfilViewset(viewsets.ModelViewSet):
    queryset = Perfil.objects.all()
    serializer_class = PerfilSerializer


class BilleteraViewset(viewsets.ModelViewSet):
    queryset = Billetera.objects.all()
    serializer_class = BilleteraSerializer