import React, { useEffect, useState } from 'react';
import Loader from './Loader';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('user')); // ✅ get user from localStorage

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/dashboard/');
                const data = await response.json();
                setDashboardData(data.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        // <div>
        //     <h2>
        //         Welcome {user?.employee_name || 'Employee'} {/* ✅ dynamic name */}
        //     </h2>
        //     <p>Here's what's happening in your organization today</p>
        // </div>
        

            <div class="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-6 text-white" 
            data-id="00ip1r0i7" data-path="src/pages/Dashboard.tsx"><h1 style={{ color: '#ee192be6' }}>Welcome {user?.employee_name || 'Employee'} {/* ✅ dynamic name */}</h1>
            <p style={{ color: '#191deee6' }} > Here's what's happening in your organization today</p></div>
    );
};

export default Dashboard;
