// src/components/Sidebar.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const hideSidebar = location.pathname === "/login-admin" || location.pathname === "/login-employee";
    if (hideSidebar) return null;

    return (
        <aside className="bg-dark text-white p-3 d-flex flex-column" style={{ width: '220px' }}>
            <h5 className="text-center mb-4">SIA HRMS</h5>
            <nav className="nav flex-column">
                <Link to="/dashboard" className="nav-link text-white">hello</Link>
                <Link to="/employees" className="nav-link text-white">Employees</Link>
                <Link to="/attendance" className="nav-link text-white">Attendance</Link>
                <Link to="/leaves" className="nav-link text-white">Leaves</Link>
                <Link to="/notifications" className="nav-link text-white">Notifications</Link>
            </nav>
        </aside>
    );
};

export default Sidebar;
