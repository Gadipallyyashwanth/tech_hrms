// src/components/ProfileModal.jsx
import React from 'react';

const ProfileModal = ({ user, onClose }) => {
    if (!user) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2>Profile Details</h2>
                <div style={styles.field}><strong>Name:</strong> {user.employee_name}</div>
                <div style={styles.field}><strong>Email:</strong> {user.email}</div>
                <div style={styles.field}><strong>Phone:</strong> {user.phone || 'N/A'}</div>
                <div style={styles.field}><strong>DOB:</strong> {user.dob || 'N/A'}</div>
                <div style={styles.field}><strong>Department:</strong> {user.department || 'N/A'}</div>
                <div style={styles.field}><strong>Employee ID:</strong> {user.employee_id}</div>
                <button style={styles.closeButton} onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    },
    modal: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '400px',
        textAlign: 'left',
        boxShadow: '0 0 10px rgba(0,0,0,0.25)'
    },
    field: {
        margin: '10px 0'
    },
    closeButton: {
        marginTop: '15px',
        padding: '8px 16px',
        backgroundColor: '#1b263b',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default ProfileModal;
