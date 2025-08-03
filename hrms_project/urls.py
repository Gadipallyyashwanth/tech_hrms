"""
URL configuration for hrms_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from hr import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('api/dashboard/', views.dashboard_api, name='dashboard'),
    path('api/login/', views.login_api, name='login_api'),
    path('api/leaves/', views.leaves_api, name='leaves_api'),
    path('api/notifications/', views.notifications_api, name='notifications_api'),
    path('api/attendance/', views.attendance_api, name='attendance_api'),
    path('api/employees/', views.employees_api, name='employees_api'),  # previously added
    path('api/users/', views.users_api, name='users_api'),              # ✅ ADD THIS 
    path('api/employees/', views.employees_api, name='employees_api'),
    path('api/employees/<str:employee_id>/', views.employee_detail_api, name='employee_detail_api'),
    path('api/employees/<str:employee_id>', views.update_employee, name='update_employee'),
    path("api/get-csrf/", views.get_csrf),
    path('api/check-employee-id/<str:employee_id>/', views.check_employee_id_exists, name='check_employee_id'),
    
]



