from django.shortcuts import render

# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .models import Product
from .serializers import ProductSerializer, UserRegistrationSerializer


@api_view(['GET'])
def get_products(request):
    category = request.GET.get('category')
    products = Product.objects.filter(category=category) if category else Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def add_products(request):
    # Handle both single product and bulk array
    is_many = isinstance(request.data, list)
    serializer = ProductSerializer(data=request.data, many=is_many)
    
    if serializer.is_valid():
        serializer.save()
        count = len(serializer.data) if is_many else 1
        return Response(
            {
                'message': f'Successfully added {count} product(s)',
                'count': count,
                'data': serializer.data
            },
            status=status.HTTP_201_CREATED
        )
    return Response(
        {'error': 'Invalid product data', 'details': serializer.errors},
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['POST'])
def bulk_add_products(request):
    serializer = ProductSerializer(data=request.data, many=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def register_user(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'message': 'User registered successfully!'},
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        return Response(
            {'message': 'Login successful!', 'username': user.username},
            status=status.HTTP_200_OK
        )
    return Response(
        {'error': 'Invalid username or password.'},
        status=status.HTTP_401_UNAUTHORIZED
    )