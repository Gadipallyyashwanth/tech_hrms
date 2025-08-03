// src/components/Employees.jsx

import React, { useEffect, useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchEmployees() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/employees/');
                const data = await response.json();
                setEmployees(data.data || []);
            } catch (error) {
                console.error('Error fetching employees:', error);
                setEmployees([]);
            } finally {
                setLoading(false);
            }
        }
        fetchEmployees();
    }, []);

    

    const filteredEmployees = Array.isArray(employees)
        ? employees.filter(emp =>
            (emp?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (emp?.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (emp?.employee_id?.toLowerCase() || '').includes(searchTerm.toLowerCase())
        )
        : [];

    const handleExport = () => {
        const csvHeader = "Seq,Employee ID,Name,Department,Join Date,Phone,Status\n";
        const csvRows = filteredEmployees.map((emp, idx) =>
            `${idx + 1},"${emp.employee_id}","${emp.name}","${emp.department}","${emp.join_date}","${emp.phone}","${emp.status}"`
        );
        const csvContent = csvHeader + csvRows.join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'employees.csv');
        link.click();
    };

    if (loading) {
        return <p style={{ padding: '20px', textAlign: 'center' }}>Loading employees...</p>;
    }

    
    return (
        <div className="w-full max-w-7xl mx-auto mt-4 p-4 border rounded-lg shadow">
            <div className="flex flex-wrap items-center justify-between mb-4 w-full">
                <h2 className="text-2xl font-bold text-gray-800">Employee Directory</h2>
                <div className="ml-auto">
                <button
                    className="bg-dark text-white border border-black px-4 py-2 rounded hover:bg-gray-100 transition"
                    onClick={handleExport}
                >
                    Export CSV
                </button>
                <button
                    className="bg-white text-black border border-black px-4 py-2 rounded hover:bg-gray-100 transition"
                    onClick={() => navigate('/add-employee')}
                >
                    + Add Employee
                </button>
                </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-4 items-center">
                <input
                    type="text"
                    placeholder="Search by name, email, or employee ID..."
                    className="border rounded px-2 py-1 flex-1 min-w-[200px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select className="border rounded px-2 py-1 min-w-[150px]">
                    <option>All Departments</option>
                    <option>IT</option>
                    <option>Human Resources</option>
                </select>
                <select className="border rounded px-2 py-1 min-w-[120px]">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
            </div>

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead style={styles.thead}>
                        <tr>
                            <th style={styles.th}>#Seq</th>
                            <th style={styles.th}>Employee ID</th>
                            <th style={styles.th}>Name</th>
                            <th style={styles.th}>Department</th>
                            <th style={styles.th}>Join Date</th>
                            <th style={styles.th}>Phone</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((emp, index) => (
                            <tr key={index} style={styles.tr}>
                                <td style={styles.td}>{index + 1}</td>
                                <td style={styles.td}>{emp.employee_id || 'N/A'}</td>
                                <td style={styles.td}>{emp.name || 'N/A'}</td>
                                <td style={styles.td}>{emp.department || 'N/A'}</td>
                                <td style={styles.td}>{emp.join_date || 'N/A'}</td>
                                <td style={styles.td}>{emp.phone || 'N/A'}</td>
                                <td style={{
                                    ...styles.td,
                                    color: emp.status?.toLowerCase() === 'active' ? 'green' : 'red',
                                    fontWeight: 'bold'
                                }}>{emp.status || 'N/A'}</td>
                                <td className="p-4 w-[10%]">
                                    <div className="flex gap-2">
                                        <button
                                            className="p-1 hover:bg-gray-200 rounded"
                                            title="View"
                                            onClick={() => console.log('View clicked:', emp)}
                                        >
                                            <Eye size={15} />
                                        </button>
                                        <button
                                            className="p-1 hover:bg-gray-200 rounded text-red-500"
                                            title="Delete"
                                            style={{ color: '#eb0b0be6' }}
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredEmployees.length === 0 && (
                            <tr>
                                <td colSpan="8" style={{ textAlign: 'center', padding: '10px' }}>
                                    No employees found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const styles = {
    tableContainer: {
        overflowX: 'auto',
        maxHeight: 'calc(100vh - 250px)',
        overflowY: 'auto',
        borderRadius: '6px',
        border: '1px solid #ddd'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        tableLayout: 'fixed'
    },
    thead: {
        backgroundColor: '#e0f7f9',
        position: 'sticky',
        top: 0,
        zIndex: 1
    },
    th: {
        padding: '10px',
        textAlign: 'center',
        borderBottom: '1px solid #ddd',
        fontSize: '14px',
        fontWeight: '600'
    },
    tr: {
        backgroundColor: '#eef6fb',
        borderBottom: '0.5px solid #ddd',
        height: '28px',
        transition: 'background 0.2s ease-in-out'
    },
    td: {
        padding: '6px 8px',
        textAlign: 'center',
        fontSize: '14px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '150px'
    }
};

export default Employees;
