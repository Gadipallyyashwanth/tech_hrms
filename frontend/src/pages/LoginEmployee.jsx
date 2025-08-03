import React from 'react';
import LoginAdmin from './LoginAdmin';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginEmployee = () => {
  const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            // Redirect if already logged in
            if (user.role === 'admin') {
                navigate('/dashboard');
            } else if (user.role === 'employee') {
                navigate('/employee-dashboard');
            }
        }
    }, [navigate]);
  return <LoginAdmin />;
};

export default LoginEmployee;
