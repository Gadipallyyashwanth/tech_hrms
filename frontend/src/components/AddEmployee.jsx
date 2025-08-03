// src/components/AddEmployee.jsx ddd
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        employee_id: '',
        first_name: '',
        last_name: '',
        gender: '',
        designation: '',
        email: '',
        dob: '',
        department: '',
        join_date: '',
        phone: '',
        emergency_contact_number: '',
        status: 'active',
        current_address: '',
        permanent_address: '',
        blood_group: '',
        formal_photograph: '',
        company: ''
    });

    const [errors, setErrors] = useState({});
    const [employeeIdExists, setEmployeeIdExists] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: false
        }));

        if (name === 'employee_id') setEmployeeIdExists(false);
    };

    const validate = () => {
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            if (
                !formData[field] &&
                field !== 'emergency_contact_number' &&
                field !== 'current_address' &&
                field !== 'permanent_address' &&
                field !== 'blood_group' &&
                field !== 'formal_photograph' &&
                field !== 'company'
            ) {
                newErrors[field] = true;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        // Check for duplicate employee_id (optional backend API)
        const checkResponse = await fetch(`/api/check-employee-id/${formData.employee_id}`);
        const checkData = await checkResponse.json();

        if (checkData.exists) {
            setEmployeeIdExists(true);
            return;
        }

        const dataToSubmit = {
            ...formData,
            name: `${formData.first_name} ${formData.last_name}`
        };

        const response = await fetch('/api/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSubmit)
        });

        if (response.ok) {
            alert('Employee added successfully');
            navigate('/employees');
        } else {
            alert('Error adding employee');
        }
    };

    const handleReset = () => {
        setFormData({
            employee_id: '',
            first_name: '',
            last_name: '',
            gender: '',
            designation: '',
            email: '',
            dob: '',
            department: '',
            join_date: '',
            phone: '',
            emergency_contact_number: '',
            status: 'active',
            current_address: '',
            permanent_address: '',
            blood_group: '',
            formal_photograph: '',
            company: ''
        });
        setErrors({});
        setEmployeeIdExists(false);
    };

    return (
        <div className="max-w-4xl mx-auto mt-6 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Add New Employee</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="employee_id" label="Employee ID" error={errors.employee_id} value={formData.employee_id} onChange={handleChange} />
                {employeeIdExists && <p className="text-red-500 text-sm col-span-2">Employee ID already exists</p>}
                <Input name="first_name" label="First Name" error={errors.first_name} value={formData.first_name} onChange={handleChange} />
                <Input name="last_name" label="Last Name" error={errors.last_name} value={formData.last_name} onChange={handleChange} />
                <Input name="designation" label="Designation" error={errors.designation} value={formData.designation} onChange={handleChange} />
                <Input name="email" label="Email" error={errors.email} value={formData.email} onChange={handleChange} type="email" />
                <Input name="dob" label="Date of Birth" error={errors.dob} value={formData.dob} onChange={handleChange} type="date" />
                <Input name="join_date" label="Join Date" error={errors.join_date} value={formData.join_date} onChange={handleChange} type="date" />
                <Input name="department" label="Department" error={errors.department} value={formData.department} onChange={handleChange} />
                <Input name="phone" label="Phone" error={errors.phone} value={formData.phone} onChange={handleChange} />
                <Input name="emergency_contact_number" label="Emergency Contact" value={formData.emergency_contact_number} onChange={handleChange} />
                <Select name="gender" label="Gender" value={formData.gender} onChange={handleChange} error={errors.gender} options={['Male', 'Female']} />
                <Select name="status" label="Status" value={formData.status} onChange={handleChange} error={errors.status} options={['active', 'inactive', 'other']} />
                <Input name="blood_group" label="Blood Group" value={formData.blood_group} onChange={handleChange} />
                <Input name="company" label="Company" value={formData.company} onChange={handleChange} />
                <Input name="formal_photograph" label="Photo URL" value={formData.formal_photograph} onChange={handleChange} />
                <Textarea name="current_address" label="Current Address" value={formData.current_address} onChange={handleChange} />
                <Textarea name="permanent_address" label="Permanent Address" value={formData.permanent_address} onChange={handleChange} />
            </div>

            <div className="mt-6 flex justify-between">
                <button onClick={() => navigate('/employees')} className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-4 py-2 rounded">
                    Back
                </button>
                <div className="flex gap-2">
                    <button onClick={handleReset} className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded">
                        Refresh
                    </button>
                    <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

const Input = ({ name, label, value, onChange, type = 'text', error }) => (
    <div>
        <label className="block text-sm font-medium mb-1">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none`}
        />
    </div>
);

const Textarea = ({ name, label, value, onChange }) => (
    <div className="col-span-2">
        <label className="block text-sm font-medium mb-1">{label}</label>
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
            rows={3}
        />
    </div>
);

const Select = ({ name, label, value, onChange, options, error }) => (
    <div>
        <label className="block text-sm font-medium mb-1">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none`}
        >
            <option value="">Select</option>
            {options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
            ))}
        </select>
    </div>
);

export default AddEmployee;
