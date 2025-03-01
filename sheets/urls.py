from django.urls import path
from . import views

app_name = 'sheets'

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('create/', views.create_spreadsheet, name='create'),
    path('<int:pk>/', views.spreadsheet_view, name='spreadsheet'),
    path('save/<int:pk>/', views.save_spreadsheet, name='save'),
    path('load/<int:pk>/', views.load_spreadsheet, name='load'),
]
