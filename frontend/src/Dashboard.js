// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        totalEmployees: 0,
        presentToday: 0,
        pendingLeaves: 0,
        notifications: 0,
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/dashboard/');
                const data = await response.json();
                if (data.status === 'success') {
                    setDashboardData({
                        totalEmployees: data.data.totalEmployees,
                        presentToday: data.data.todayAttendance,
                        pendingLeaves: data.data.pendingLeaves,
                        notifications: data.data.notifications,
                    });
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-semibold mb-4">Good Morning, Admin!</h1>
            <p className="text-gray-600 mb-6">Here's what's happening in your organization today.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card
                    title="Total Employees"
                    value={dashboardData.totalEmployees}
                    color="text-green-600"
                    icon="👥"
                />
                <Card
                    title="Present Today"
                    value={dashboardData.presentToday}
                    color="text-blue-600"
                    icon="✅"
                />
                <Card
                    title="Pending Leaves"
                    value={dashboardData.pendingLeaves}
                    color="text-yellow-600"
                    icon="🕒"
                />
                <Card
                    title="Notifications"
                    value={dashboardData.notifications}
                    color="text-purple-600"
                    icon="🔔"
                />
            </div>
        </div>
    );
};

const Card = ({ title, value, color, icon }) => (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-sm font-medium text-gray-500">{title}</h2>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
            </div>
            <div className="text-3xl">{icon}</div>
        </div>
    </div>
);

export default Dashboard;
