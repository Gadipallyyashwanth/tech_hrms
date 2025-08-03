from rest_framework import serializers
from .models import Employees, Users, Attendance, Leaves, Notifications

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employees
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'

class LeaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leaves
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notifications
        fields = '__all__'
