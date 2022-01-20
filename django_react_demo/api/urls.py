from django.urls import path, include
from rest_framework import routers
from api.views import UserModelViewset, UserViewset, PerfilViewset, BilleteraViewset

router = routers.DefaultRouter()
""" router.register(r'users', UserViewset) """
router.register(r'users', UserViewset)
router.register(r'usersmodel', UserModelViewset)
router.register(r'profiles', PerfilViewset)
router.register(r'wallets', BilleteraViewset)

urlpatterns = [
    path('', include(router.urls)),
    #path('auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls'))
]
