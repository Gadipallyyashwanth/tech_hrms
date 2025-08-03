from django.db import models

class Employees(models.Model):
    id = models.AutoField(primary_key=True)
    employee_id = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=100, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=50)
    designation = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    dob = models.DateField()
    department = models.CharField(max_length=100, blank=True, null=True)
    join_date = models.DateField()
    phone = models.CharField(max_length=100)
    emergency_contact_number = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=100, default='active')
    current_address = models.TextField(blank=True, null=True)
    permanent_address = models.TextField(blank=True, null=True)
    blood_group = models.CharField(max_length=100, blank=True, null=True)
    formal_photograph = models.URLField(max_length=500, blank=True, null=True)
    company = models.CharField(max_length=100, blank=True, null=True)
    attribute1 = models.TextField(blank=True, null=True)
    attribute2 = models.TextField(blank=True, null=True)
    attribute3 = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        managed = False
        db_table = 'employees'

    def __str__(self):
        return f"{self.employee_id} - {self.name}"


class Users(models.Model):
    id = models.AutoField(primary_key=True)
    employee = models.ForeignKey(Employees, to_field='employee_id', db_column='employee_id', on_delete=models.CASCADE)
    email = models.EmailField(max_length=100, unique=True)
    password = models.TextField()
    role = models.CharField(max_length=20, default='employee')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    attributeu1 = models.TextField(blank=True, null=True)
    attributeu2 = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'

    def __str__(self):
        return self.email


class Attendance(models.Model):
    id = models.AutoField(primary_key=True)
    employee = models.ForeignKey(Employees, to_field='employee_id', db_column='employee_id', on_delete=models.CASCADE)
    date = models.DateField()
    clock_in = models.TimeField(null=True, blank=True)
    clock_out = models.TimeField(null=True, blank=True)
    status = models.CharField(max_length=20, default='present')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    attributea1 = models.TextField(blank=True, null=True)
    attributea2 = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'attendance'
        unique_together = (('employee', 'date'),)

    def __str__(self):
        return f"{self.employee} - {self.date}"


class Leaves(models.Model):
    id = models.AutoField(primary_key=True)
    employee = models.ForeignKey(Employees, to_field='employee_id', db_column='employee_id', on_delete=models.CASCADE)
    leave_type = models.CharField(max_length=50)
    from_date = models.DateField()
    to_date = models.DateField()
    reason = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=20, default='pending')
    applied_on = models.DateTimeField(auto_now_add=True)
    approved_on = models.DateTimeField(null=True, blank=True)
    attributel1 = models.TextField(blank=True, null=True)
    attributel2 = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'leaves'

    def __str__(self):
        return f"{self.employee} - {self.leave_type}"


class Notifications(models.Model):
    id = models.AutoField(primary_key=True)
    employee = models.ForeignKey(Employees, to_field='employee_id', db_column='employee_id', on_delete=models.CASCADE)
    type = models.CharField(max_length=50)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    attributen1 = models.TextField(blank=True, null=True)
    attributen2 = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'notifications'

    def __str__(self):
        return f"{self.employee} - {self.type}"
