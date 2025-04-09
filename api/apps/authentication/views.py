from django.contrib.auth import login

from knox.views import LoginView as KnoxLoginView
from rest_framework import generics, permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response

from .serializers import UserSerializer, AuthSerializer


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer


class LoginView(KnoxLoginView):
    serializer_class = AuthSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)

        user_serializer = UserSerializer(user)

        token = super(LoginView, self).post(request, format=None).data["token"]

        return Response(
            {
                "user": user_serializer.data,
                "token": token,
            }
        )
