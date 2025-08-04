import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginAdmin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      if (user.role === 'admin') {
        navigate('/dashboard');
      } else if (user.role === 'employee') {
        navigate('/dashboard');
      }
    }
  }, [navigate]);

  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        employee_id: employeeId,
        password,
      });

      if (response.data.status === 'success') {
        const user = response.data.user;
        localStorage.setItem('user', JSON.stringify(user));

        if (user.role === 'admin') {
          navigate('/dashboard');
        } else if (user.role === 'employee') {
          navigate('dashboard');
        } else {
          setError('Unauthorized role. Please contact admin.');
        }
      } else {
        setError('Invalid credentials.');
      }
    } catch (error) {
      console.error(error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light p-3">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-3">
          <img
            src='/techprojects_logo.png'
            alt="SIA HRMS Logo"
            className="mb-3"
            style={{ width: '80px', height: '80px', display: 'inline-flex' }}
          />
          <p className="text-primary fw-bold fs-5 animate-text">TECHPROJECTS</p>
          <h3 className="fw-bold">SIA HRMS Login</h3>
        </div>

        {error && (
          <div className="alert alert-danger py-2 text-center small">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Employee ID</label>
            <input
              type="text"
              placeholder="TPI***"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
