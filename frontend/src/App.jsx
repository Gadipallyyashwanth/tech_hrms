// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Employees from './components/Employees';
import Attendance from './components/Attendance';
import Leaves from './components/Leaves';
import Notifications from './components/Notifications';
import LoginAdmin from './pages/LoginAdmin';
import LoginEmployee from './pages/LoginEmployee';
import Layout from './components/Layout';
import AddEmployee from './components/AddEmployee';

function App() {
    return (
        <Router>
            <Routes>
                {/* Login pages WITHOUT layout */}
                <Route path="/login-admin" element={<LoginAdmin />} />
                <Route path="/login-employee" element={<LoginEmployee />} />

                {/* Pages WITH layout */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="employees" element={<Employees />} />
                    <Route path="attendance" element={<Attendance />} />
                    <Route path="leaves" element={<Leaves />} />
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="add-employee" element={<AddEmployee />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
