from django.db import models
from django.contrib.auth.models import User, AbstractUser
from django.db.models.signals import post_save
# Create your models here.
 
class User_model(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.username

class Crypto(models.Model):
    name = models.CharField(max_length=50)
    image = models.ImageField()
    price = models.CharField(max_length=50)

TYPE_OF_ORDER_CHOICE =(
    ('compra', 'compra'),
    ('venta', 'venta')
    )

class Trade(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, )
    fecha_creado = models.DateField(auto_now_add=True)
    start_price = models.FloatField()
    actual_price = models.FloatField()
    result = models.FloatField()
    coin = models.CharField(max_length = 10)
    cantidad = models.IntegerField()
    type_of_order = models.CharField( 
        max_length = 10, 
        choices = TYPE_OF_ORDER_CHOICE, 
        default = 'compra'
        ) 

class Billetera(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    monto = models.FloatField(default=10000)
    tipo = models.CharField(max_length=4, default='usdt')

    def __str__(self):
        return f"{self.user}: {self.monto} {self.tipo}"

class Perfil(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    biography = models.CharField(max_length=500)
    phone_number = models.CharField(max_length=20)
    picture = models.ImageField(default=('default_profile.png'))

    def __str__(self):
        return self.user.username


def create_perfil_bill(sender, instance, created, **kwargs):
    if created:
        Perfil.objects.create(user=instance)
        Billetera.objects.create(user=instance)

# created profile
post_save.connect(create_perfil_bill, sender=User)

def save_perfil_bill(sender, instance, created, **kwargs):
    
    if created:
        instance.perfil.save()
        instance.billetera.save()

# save created profile
post_save.connect(save_perfil_bill, sender=User_model)


    
