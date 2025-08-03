from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from hr.models import Users, Attendance, Leaves, Notifications, Employees
from datetime import date



@ensure_csrf_cookie
def get_csrf(request):
    return JsonResponse({'message': 'CSRF cookie set'})


@csrf_exempt
def login_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            employee_id = data.get('employee_id', '').strip().upper()
            password = data.get('password', '').strip()

            print(f"Employee ID received: '{employee_id}'")
            print(f"Password received: '{password}'")

            users = Users.objects.filter(employee__employee_id=employee_id)
            print(f"Users with employee_id: {users.count()}")

            if users.exists():
                user = users.select_related('employee').first()
                stored_password = user.password.strip()
                print(f"Stored password: '{stored_password}'")
                print(f"Passwords equal: {stored_password == password}")

                if stored_password == password:
                    print("Password match successful")
                    try:
                        employee_id = user.employee.employee_id
                        employee_name = user.employee.name
                    except Exception as e:
                        print(f"Employee relation error: {e}")
                        employee_id = None
                        employee_name = None

                    return JsonResponse({
                        "status": "success",
                        "message": "Login successful",
                        "user": {
                            "id": user.id,
                            "employee_id": employee_id,
                            "employee_name": employee_name,
                            "role": user.role
                        }
                    })
                else:
                    print("Password does not match")
            else:
                print("No user with that employee_id")

            return JsonResponse({
                "status": "error",
                "message": "Invalid credentials"
            })
        except Exception as e:
            import traceback
            print(traceback.format_exc())
            return JsonResponse({
                "status": "error",
                "message": str(e)
            })
    else:
        return JsonResponse({
            "status": "error",
            "message": "Invalid request method"
        })





def dashboard_api(request):
    from hr.models import Employees, Leaves, Attendance, Notifications

    total_employees = Employees.objects.count()
    pending_leaves = Leaves.objects.filter(status='pending').count()
    today_attendance = Attendance.objects.filter(date=date.today()).count()
    notifications_count = Notifications.objects.count()

    data = {
        "status": "success",
        "message": "Dashboard data fetched successfully",
        "data": {
            "totalEmployees": total_employees,
            "pendingLeaves": pending_leaves,
            "todayAttendance": today_attendance,
            "notifications": notifications_count,
        }
    }
    return JsonResponse(data)


def employees_api(request):
    employees = Employees.objects.all().values(
        'name','first_name', 'last_name', 'email', 'employee_id', 'department', 'phone', 'emergency_contact_number','join_date','designation', 'gender', 'dob', 'status', 
        'current_address', 'permanent_address', 'blood_group', 'formal_photograph', 'company' , 'attribute1' , 'attribute2', 'attribute3', 'created_at' , 'updated_at'
    )
    
    # Convert queryset to list and format join_date
    employees_list = []
    for emp in employees:
        emp['join_date'] = emp['join_date'].strftime('%m/%d/%Y') if emp['join_date'] else None
        employees_list.append(emp)

    return JsonResponse({
        "status": "success",
        "message": "Employees data fetched successfully",
        "data": employees_list
    })


def users_api(request):
    users = Users.objects.all().values('id','employee_id', 'email', 'password','role', 'attributeu1' , 'attributeu2', 'created_at', 'updated_at')
    users_list = list(users)
    return JsonResponse({
        "status": "success",
        "message": "Users data fetched successfully",
        "data": users_list
    })



def attendance_api(request):
    today_attendance = Attendance.objects.filter(date=date.today()).count()

    return JsonResponse({
        "status": "success",
        "message": "Attendance data fetched successfully",
        "data": {
            "todayAttendance": today_attendance
        }
    })
    
def leaves_api(request):
    leaves_count = Leaves.objects.count()
    pending_leaves = Leaves.objects.filter(status='pending').count()

    return JsonResponse({
        "status": "success",
        "message": "Leaves data fetched",
        "data": {
            "totalLeaves": leaves_count,
            "pendingLeaves": pending_leaves,
        }
    })

def notifications_api(request):
    notifications = Notifications.objects.all().values('employee_id','type', 'message' 'is_read', 'attributen1', 'attributen1', 'created_at')
    return JsonResponse({
        "status": "success",
        "data": list(notifications)
    })
   
def home(request):
    return HttpResponse("Welcome to TechProjects HRMS Backend API")



from django.shortcuts import get_object_or_404

def employee_detail_api(request, employee_id):
    try:
        emp = get_object_or_404(Employees, employee_id=employee_id)

        emp_data = {
            'id': emp.id,
            'name': emp.name,
            'email': emp.email,
            'employee_id': emp.employee_id,
            'department': emp.department,
            'phone': emp.phone,
            'emergency_contact_number': emp.emergency_contact_number,
            'join_date': emp.join_date.strftime('%m/%d/%Y') if emp.join_date else None,
            'designation': emp.designation,
            'gender': emp.gender,
            'dob': emp.dob.strftime('%m/%d/%Y') if emp.dob else None,
            'status': emp.status,
            'current_address': emp.current_address,
            'permanent_address': emp.permanent_address,
            'blood_group': emp.blood_group,
            'formal_photograph': emp.formal_photograph,
            'company': emp.company,
            'attribute1': emp.attribute1,
            'attribute2': emp.attribute2,
            'attribute3': emp.attribute3,
            'created_at': emp.created_at,
            'updated_at': emp.updated_at,
        }

        return JsonResponse({
            "status": "success",
            "message": "Employee detail fetched successfully",
            "data": emp_data
        })

    except Exception as e:
        return JsonResponse({
            "status": "error",
            "message": str(e)
        }, status=500)



# @csrf_exempt
def update_employee(request, employee_id):
    if request.method == 'PUT':
        try:
            employee = Employees.objects.get(employee_id=employee_id)
            data = json.loads(request.body)

            for field, value in data.items():
                setattr(employee, field, value)

            employee.save()
            return JsonResponse({'status': 'success', 'message': 'Employee updated successfully'})
        except Employees.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Employee not found'}, status=404)
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid method'}, status=400)



def check_employee_id_exists(request, employee_id):
    exists = Employees.objects.filter(employee_id=employee_id).exists()
    return JsonResponse({'exists': exists})