from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from api.serializer import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
import logging

logger = logging.getLogger(__name__)


def set_auth_cookies(response , access_token , refresh_token=None):
    """
    Helper function to set authentication cookies.
    """
    cookies_setting = {
        'path' :'/',
        'samesite' :'None',
        'max_age': 3600,
        'secure' :True,
        'httponly' :True,
    }

    response.set_cookie(key='access_token' , value=access_token , **cookies_setting)
    # ** Unpack The Cookie Dict 

    if refresh_token :
        response.set_cookie(key='refresh_token' , value=refresh_token , **cookies_setting) 

    return response

def error_response(message , status=status.HTTP_400_BAD_REQUEST , **kwargs):
    return Response({'success': False, 'error': message, **kwargs}, status=status)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self,attrs):
        data = super().validate(attrs)
        data['user'] = UserSerializer(self.user).data
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Custom view for login: issues JWT tokens and sets them in cookies.
    """

    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request , *args , **kwargs):
        try:
            token_response = super().post( request , *args , **kwargs)
            token_data = token_response.data

            access_token = token_data.get('access')
            refresh_token = token_data.get('refresh')
            user_data = token_data.get('user')

            if not access_token or not refresh_token:
                logger.error("Tokens Not Generated Properly")
                return error_response("Tokens Not Generated Properly")

            response = Response({'success':True , 'data' : user_data},status = status.HTTP_200_OK)
            return set_auth_cookies(response , access_token , refresh_token)  
        except Exception as e:
            logger.error("Token Obtain Failed")
            return error_response(str(e) , status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CustomRefreshTokenView(TokenRefreshView):
    """
    Custom view for refreshing the access token using a refresh token from cookies.
    """
    def post(self, request , *args , **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            if not refresh_token:
                return error_response("No refresh token found in cookies")
            
            request.data['refresh'] = refresh_token

            token_response = super().post( request , *args , **kwargs)
            new_access_token = token_response.data.get('access')

            if not new_access_token:
                logger.error("No Access Token After Refresh")
                return error_response("No Access Token After Refresh")

            response = Response({'success':True},status = status.HTTP_200_OK)
            return set_auth_cookies(response , new_access_token ) 

        except Exception as e:
            logger.error("Token Refresh Failed")
            return error_response(str(e) , status=status.HTTP_500_INTERNAL_SERVER_ERROR)
