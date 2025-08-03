import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login-admin');
        } else {
            if (user.role === 'employee') {
                navigate('/employee-dashboard');
            } else if (user.role === 'admin') {
                navigate('/dashboard');
            }
        }
    }, [navigate]);

    return null;
};

export default HomeRedirect;
