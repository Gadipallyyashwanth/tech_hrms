// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState({
        totalEmployees: 0,
        pendingLeaves: 0,
        todayAttendance: 0,
        notifications: 0
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/dashboard/');
                const data = await response.json();
                if (data.status === 'success') {
                    setDashboardData(data.data);
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Total Employees</h2>
                    <p className="text-3xl font-bold text-blue-600">{dashboardData.totalEmployees}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Pending Leaves</h2>
                    <p className="text-3xl font-bold text-green-600">{dashboardData.pendingLeaves}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Today's Attendance</h2>
                    <p className="text-3xl font-bold text-yellow-600">{dashboardData.todayAttendance}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Notifications</h2>
                    <p className="text-3xl font-bold text-purple-600">{dashboardData.notifications}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
