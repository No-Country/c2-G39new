from django import forms 
from .models import * 
from django.contrib.auth.forms import UserCreationForm 
#from django.contrib.auth.models import User
from django.forms import widgets, ModelForm
from django.contrib.auth import get_user_model 

#User = get_user_model() 
class LogInForm(forms.Form): #
    username = forms.CharField(
        min_length=4,
        max_length=50,
        label=False,
        widget=forms.TextInput(
            attrs={
                'placeholder': 'Username',
                'class': 'form-control',
                'required': True
            })
    )
    password = forms.CharField(
        min_length=8,
        max_length=70,
        label=False,
        widget=forms.PasswordInput(
            attrs={
                'placeholder': 'Password',
                'class': 'form-control',
                'type': 'password',
                'required': True
            })
    )

class Trade_form(ModelForm):
    class Meta:
        model = Trade
        fields = ('__all__')
        #fields = ('coin_1',  'cant_1', 'coin_2', 'type_of_order')
        #exclude = ('__all__')

    