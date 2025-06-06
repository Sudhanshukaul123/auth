from django.urls import path
from api.views import *
from api.token import *
urlpatterns = [
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='user_login'),  # JWT login
    path('auth/token/refresh/', CustomRefreshTokenView.as_view(), name='token_refresh'),
    path("auth/signup/", Signup, name="userSignUp"),
    path("auth/logout/", Logout, name="userLogout"),
    path("", Home, name="home")
]