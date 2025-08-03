from django.urls import path
from . import views


urlpatterns = [
    # ... your other endpoints ...
    path('api/login/', views.login_user, name='login_user'),
    path('api/dashboard/', views.dashboard_data),
    
]

