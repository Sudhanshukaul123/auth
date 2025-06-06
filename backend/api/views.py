from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from api.authentication import CookiesJWTAuthentication  # Add this import
from django.contrib.auth.models import User
from api.serializer import *
from api.token import set_auth_cookies  # Import your helper
import logging


logger = logging.getLogger(__name__)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([CookiesJWTAuthentication])
def Home(request):
    user = request.user
    return Response({
        'success' : True ,
        'message': 'User Info',
        'user': UserSerializer(user).data
        },status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def Signup(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        # Generate tokens
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        # Create response with user data
        response = Response({
            'success': True,
            'message': 'User registered successfully',
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)

        return set_auth_cookies(response, access_token, refresh_token)

    return Response({
        'success': False,
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([CookiesJWTAuthentication])
def Logout(request):
    try:
        # Use same cookie settings as when setting them
        cookie_settings = {
            'path': '/',
            'samesite': 'None',
        }
        response = Response({'success' : True ,'message': 'Logged Out (For Now) '},status=status.HTTP_200_OK)
        response.delete_cookie('access_token', **cookie_settings)
        response.delete_cookie('refresh_token', **cookie_settings)

        return response
    except Exception as e :
        return Response({'sucess' : False , 'error' : str(e)}
                        ,status=status.HTTP_400_BAD_REQUEST)
