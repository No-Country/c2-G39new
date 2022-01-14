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

    context = {'data': data}
    
    return render(request, 'main.html', context)    

@login_required
def profile_view(request):
    user_p = get_object_or_404(User, pk=request.user.id )
    profile = Perfil.objects.get(user=user_p)
    billetera = Billetera.objects.get(user=user_p)
    context ={
        'profile': profile,
        'user' : user_p,
        'billetera' : billetera,
        'trade_form' : Trade_form
        }
    return render(request, 'profile.html',context)    





