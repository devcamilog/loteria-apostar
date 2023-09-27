from django.shortcuts import render
from django.http import HttpResponse , JsonResponse
# Create your views here.

def vistaPrincipal(request):
    return render(request, 'index.html')