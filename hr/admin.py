
from django.contrib import admin
from .models import Employees, Users, Attendance, Leaves, Notifications


# Register your models here.
admin.site.register(Employees)
admin.site.register(Users)
admin.site.register(Attendance)
admin.site.register(Leaves)
admin.site.register(Notifications)


