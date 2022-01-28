from django.db import models
from django.contrib.auth.models import User, AbstractUser
from django.db.models.signals import post_save
import requests
# Create your models here.
url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false'
data = requests.get(url).json()
class User_model(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.username

class Crypto(models.Model):
    name = models.CharField(max_length=50)
    #image = models.ImageField()
    def __str__(self):
        return self.name


class Billetera(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    #monto = models.FloatField(default=10000)
    #tipo = models.CharField(max_length=4, default='usdt')
    def __str__(self):
        return f'Billetera de {self.user}'
    
class Perfil(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    biography = models.CharField(max_length=500)
    phone_number = models.CharField(max_length=20)
    picture = models.ImageField(default=('default_profile.png'))

    def __str__(self):
        return self.user.username

class Crypto_comprada(models.Model): 
    billetera = models.ForeignKey(Billetera, on_delete=models.CASCADE)
    crypto = models.ForeignKey(Crypto, on_delete=models.CASCADE)
    name = crypto.name
    cantidad = models.FloatField()
    
    def transaccion(form,bill):
        
        tipo = form.data['type_of_order']
        name_filter=Crypto.objects.get(pk=form.data['coin_2']).name    
        cant_inv = float(form.data['cant_1'])
        crypto_c=Crypto.objects.get(pk=form.data['coin_1'])
        crypto_i=Crypto.objects.get(pk=form.data['coin_2'])
        cr_usada_qs = Crypto_comprada.objects.filter(billetera=bill, crypto=crypto_c)
        cr_invert_qs = Crypto_comprada.objects.filter(billetera=bill, crypto=crypto_i)
        cr_obj_us = Crypto_comprada.objects.get(pk=form.data['coin_1'],billetera=bill)
        message='error'
        disponible = Crypto_comprada.objects.get(pk=form.data['coin_1']).cantidad
        
        if tipo == 'compra' and cant_inv < disponible and cant_inv > 0:
            name_filter=Crypto.objects.get(pk=form.data['coin_2']).name

            for i in range(len(data)):
                if data[i]['name'] == name_filter:
                    precio = data[i]['current_price']        

                    break
            
            cant = cant_inv/float(precio)
            #---------------------------COIN_1--------------------------
            cr_obj_us.cantidad = float(cr_obj_us.cantidad) - cant_inv
                
            cr_obj_us.save(update_fields=['cantidad'])
            #---------------------------COIN_2--------------------------
            if cr_invert_qs.exists():
                cr_obj_inv = Crypto_comprada.objects.get(crypto=form.data['coin_2'],billetera=bill)
                
                cr_obj_inv.cantidad = float(cr_obj_inv.cantidad) + cant
                cr_obj_inv.save(update_fields=['cantidad'])

                        
            else:
                Crypto_comprada.objects.create(
                    billetera=bill,
                    crypto=crypto_i,
                    cantidad=cant
                    )
            aaa = Crypto.objects.get(pk=form.data['coin_2']).name
            bbb = Crypto_comprada.objects.get(pk=form.data['coin_1']).crypto.name
            message = f"Se compro {aaa} con {bbb} "
            Trade.objects.create(
                user_id=bill,
                coin_1=cr_obj_us,
                cant_1=cant_inv,
                coin_2=crypto_i,
                cant_2=cant,
                type_of_order=form.data['type_of_order'],
                message=message
                )
        
            

        if tipo == 'venta' and cant_inv < disponible and cant_inv > 0:
            name_filter=Crypto_comprada.objects.get(pk=form.data['coin_1']).crypto.name
            
            for i in range(len(data)):
                if data[i]['name'] == name_filter:
                    precio = data[i]['current_price']        

                    break
            #------------------------coin_2----------------------
            cant = cant_inv*float(precio)
            cr_usdt = Crypto_comprada.objects.get(crypto='3',billetera=bill)
            cr_usdt.cantidad = float(cr_usdt.cantidad) + cant    
            cr_usdt.save(update_fields=['cantidad'])
            #------------------------coin_1------------------
            cr_obj_us.cantidad = float(cr_obj_us.cantidad) - cant
            cr_obj_us.save(update_fields=['cantidad'])
            aaa = Crypto.objects.get(pk=form.data['coin_2']).name
            bbb = Crypto_comprada.objects.get(pk=form.data['coin_1']).crypto.name
            message = f"Se vendio {bbb} por {aaa} "
        
            Trade.objects.create(
                user_id=bill,
                coin_1=cr_obj_us,
                cant_1=cant_inv,
                coin_2=crypto_i,
                cant_2=cant_inv,
                type_of_order=form.data['type_of_order'],
                message=message
                )
                

        return message
    
    def __str__(self):
        return f'{self.crypto.name} - {self.billetera}'  

TYPE_OF_ORDER_CHOICE =(
    ('compra', 'compra'),
    ('venta', 'venta')
    )

class Trade(models.Model):
    user_id = models.ForeignKey(Billetera, on_delete=models.CASCADE, blank=True ) #alcaraz
    fecha_creado = models.DateField(auto_now_add=True) # 16/1/2022
    coin_1 = models.ForeignKey(Crypto_comprada, on_delete=models.CASCADE, ) #symbol > bitcoin : "usdt"  coin_1 =! coin_2
    cant_1 = models.FloatField()
    coin_2 = models.ForeignKey(Crypto, on_delete=models.CASCADE, ) #symbol > bitcoin : "btc"
    cant_2 = models.FloatField(blank=True) # cant_1 / precio de coin_2 = cant_2 /// cant_1 * precio de coin_1 = cant_2   
    type_of_order = models.CharField( 
        max_length = 10, 
        choices = TYPE_OF_ORDER_CHOICE, 
        default = 'compra'
        )
    message = models.TextField(blank=True)
    
    def compra_precio(filtro,cantidad):
        for i in range(len(data)):
            if data[i]['name'] == filtro:
                precio = data[i]['current_price']        
                break
        return cantidad/float(precio)

    def agregar_compra():
        pass
#-----------------------------------------------------------------------
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

#--------------------------------------------------------

def create_crypto_compr(sender, instance, created, **kwargs):
    if created:
        Crypto_comprada.objects.create(
            billetera=Billetera.objects.get(user=instance),
            crypto=Crypto.objects.get(name="Tether"),
            cantidad=10000)

post_save.connect(create_crypto_compr, sender=User)

def save_crypto_compr(sender, instance, created, **kwargs):
    
    if created:
        print("SE GUARDO CRYPTO_COMPRADA")
        instance.crypto_comprada.save()

post_save.connect(save_crypto_compr, sender=User_model)
