import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { getCSRFToken } from '../utils/csrf';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import logo from '../assests/techprojects_logo.png'; // ✅ adjust path if needed

const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);
    const [employeeData, setEmployeeData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    const hideLayout = location.pathname === "/login-admin" || location.pathname === "/login-employee";
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            if (user?.employee_id) {
                try {
                    const res = await axios.get(`/api/employees/${user.employee_id}/`);
                    setEmployeeData(res.data.data);
                    setFormData(res.data.data);
                } catch (error) {
                    console.error('Error fetching employee data:', error);
                }
            }
        };
        fetchEmployeeDetails();
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login-admin');
    };

    const handleEdit = () => setIsEditing(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const csrfToken = getCSRFToken();
            const response = await axios.put(
                `/api/employees/${user.employee_id}/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        ...(csrfToken && { 'X-CSRFToken': csrfToken }),
                    },
                    withCredentials: true,
                }
            );
            alert("Employee updated successfully");
            setEmployeeData(response.data.data || formData);
            setIsEditing(false);
            setShowProfile(false);
        } catch (error) {
            console.error("Update failed:", error);
            alert("Failed to update. Please try again.");
        }
    };

    const formatDOBForInput = (dob) => dob ? new Date(dob).toISOString().split('T')[0] : '';
    const formatDOBForDisplay = (dob) => {
        if (!dob) return '';
        const date = new Date(dob);
        return date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        });
    };

    if (hideLayout) return <Outlet />;

    return (
        <div className="d-flex" style={{ minHeight: '100vh' }}>
            {/* Sidebar */}
            <div className="bg-dark text-white p-3 d-flex flex-column" style={{ width: '240px' }}>
                <div className="flex items-center justify-start mb-8 space-x-2 whitespace-nowrap">
                    <img src={logo} alt="Company Logo" className="h-8 w-8 object-contain" style={{ height: '50px' }} />
                    <h5 className="fw-bold">SIA HRMS</h5>
                </div>
                <nav className="nav flex-column gap-1">
                    {[
                        { path: '/dashboard', label: 'Home' },
                        { path: '/employees', label: 'Employee' },
                        { path: '/attendance', label: 'Attendance' },
                        { path: '/leaves', label: 'Leaves' },
                        { path: '/notifications', label: 'Notifications' }
                    ].map(({ path, label }) => (
                        <NavLink
                            to={path}
                            key={path}
                            className={({ isActive }) =>
                                `nav-link text-white px-3 py-2 rounded ${isActive ? 'bg-primary fw-bold' : 'hover:bg-secondary'}`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>
                <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger mt-auto d-flex align-items-center gap-2"
                >
                    <FaSignOutAlt /> Logout
                </button>
            </div>

            {/* Content area */}
            <div className="flex-grow-1 d-flex flex-column">
                <div className="d-flex justify-content-end align-items-center p-2 border-bottom bg-light">
                    <FaUserCircle
                        size={28}
                        onClick={() => setShowProfile(true)}
                        style={{ cursor: 'pointer', marginRight: '15px' }}
                        title="Profile"
                    />
                </div>

                <div className="flex-grow-1 p-3 bg-light">
                    <Outlet />
                </div>

                <footer className="bg-dark text-white text-center p-3">
                    <small>
                        <strong>
                            TechProjects GCC - Hyderabad || Orbit 2nd Floor, Knowledge City, Raydurg, Hyderabad ||
                            <a href="https://techprojects.com/about/" target="_blank" rel="noopener noreferrer" className="text-info ms-4">
                                Visit Our Website
                            </a>
                        </strong>
                    </small>
                </footer>
            </div>

            {/* Profile Modal */}
            {showProfile && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">User Profile</h5>
                                <button type="button" className="btn-close" onClick={() => {
                                    setShowProfile(false);
                                    setIsEditing(false);
                                }}></button>
                            </div>
                            <div className="modal-body">
                                {employeeData ? (
                                    <form>
                                        {['name', 'email', 'phone', 'department'].map((field) => (
                                            <div key={field} className="mb-2">
                                                <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name={field}
                                                        className="form-control"
                                                        value={formData[field] || ''}
                                                        onChange={handleChange}
                                                    />
                                                ) : (
                                                    <p>{employeeData[field]}</p>
                                                )}
                                            </div>
                                        ))}

                                        <div className="mb-2">
                                            <strong>Date of Birth:</strong>
                                            {isEditing ? (
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    name="dob"
                                                    value={formatDOBForInput(formData.dob)}
                                                    onChange={handleChange}
                                                />
                                            ) : (
                                                <p>{formatDOBForDisplay(employeeData.dob)}</p>
                                            )}
                                        </div>

                                        <div className="mb-2">
                                            <strong>Gender:</strong>
                                            {isEditing ? (
                                                <select name="gender" className="form-control" value={formData.gender || ''} onChange={handleChange}>
                                                    <option value="">Select</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            ) : (
                                                <p>{employeeData.gender}</p>
                                            )}
                                        </div>

                                        <div className="mb-2">
                                            <strong>Employee ID:</strong>
                                            <p>{employeeData.employee_id}</p>
                                        </div>

                                        <div className="text-end">
                                            {!isEditing ? (
                                                <button type="button" className="btn btn-primary" onClick={handleEdit}>Edit</button>
                                            ) : (
                                                <button type="button" className="btn btn-success" onClick={handleSave}>Save</button>
                                            )}
                                        </div>
                                    </form>
                                ) : (
                                    <p>Loading profile...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Layout;
