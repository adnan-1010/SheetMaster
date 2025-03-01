from django.urls import path
from .views import signup_view
from django.contrib.auth import views as auth_views
from django.contrib.auth.views import LogoutView, LoginView

urlpatterns = [
    path('signup/', signup_view, name='signup'),
    path('login/', auth_views.LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('accounts/logout/', auth_views.LogoutView.as_view(next_page='/accounts/login/'), name='logout'),
    path('accounts/logout-get/', LogoutView.as_view(), name='logout_get'),  # Allows GET logout
]
