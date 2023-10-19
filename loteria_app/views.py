from django.shortcuts import render
from django.http import HttpResponse , JsonResponse
# Create your views here.

def vistaPrincipal(request):
    segundos_restantes = 10  # Define el número inicial de segundos
    return render(request, 'main.html', {'segundos_restantes': segundos_restantes})

def vistaLoteria(request):
    return render(request, 'index.html')
