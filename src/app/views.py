from django.shortcuts import render, get_object_or_404, redirect
from app.models import *
from django.contrib.auth.mixins import LoginRequiredMixin 
from django.contrib.auth import authenticate, login, logout 
from django.contrib.auth.decorators import login_required
from .forms import *
import requests
# Create your views here




def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user:
            login(request, user)
            return redirect('dashboard')
        else:
            return render(request, 'login.html', {
                'error': 'Invalid credentials',
                'form' : LogInForm,
            })

    return render(request, 'login.html', {'form' : LogInForm})


def logout_view(request):
    logout(request)
    return redirect('login')


def signup_view(request):
    
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('dashboard')
    else:
        form = UserCreationForm()
    return render(request, 'signup.html', {'form': form})

@login_required
def dashboard(request):
    
    url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    data = requests.get(url).json()
    
    # test: crear cryptos en base de datos
    for crypto in data:
        crypto_qs = Crypto.objects.filter(name=crypto['name'])
        if crypto_qs.exists():
            continue
        else:
            Crypto.objects.create(name=crypto['name'])
    
    context = {'data': data}
    
    return render(request, 'main.html', context)    

@login_required
def profile_view(request):
    
    url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    data = requests.get(url).json()
    
    user_p = get_object_or_404(User, pk=request.user.id )
    profile = Perfil.objects.get(user=user_p)
    billetera = Billetera.objects.get(user=user_p)
    crypto_comprada = Crypto_comprada.objects.filter(billetera=billetera)
    message = None
    if request.method == 'POST':
        form = Trade_form(request.POST)
        """
        name_filter=Crypto.objects.get(pk=form.data['coin_1']).name
        
        
        cant = Trade.compra_precio(name_filter, float(form.data['cant_1']))
        
        crypto_c=Crypto.objects.get(pk=form.data['coin_1'])
        crypto_i=Crypto.objects.get(pk=form.data['coin_2'])
        cr_usada_qs = Crypto_comprada.objects.filter(billetera=bill, crypto=crypto_c)
        cr_invert_qs = Crypto_comprada.objects.filter(billetera=bill, crypto=crypto_i)
        """
        bill=Billetera.objects.get(user=request.user)
        message = Crypto_comprada.transaccion(form,bill)

    context ={
        'profile': profile,
        'user' : user_p,
        'billetera' : billetera,
        'crypto_comprada' : crypto_comprada,
        'trade_form' : Trade_form,
        'message' : message

        }
    return render(request, 'profile.html',context)    





