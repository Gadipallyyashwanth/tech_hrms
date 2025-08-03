import React, { useEffect, useState } from 'react';

function Attendance() {
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAttendance() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/attendance/');
                const json = await response.json();
                setAttendance(json.data || []);
            } catch (error) {
                console.error("Error fetching attendance:", error);
                setAttendance([]);
            } finally {
                setLoading(false);
            }
        }
        fetchAttendance();
    }, []);

    if (loading) return <p>Loading attendance data...</p>;

    return (
        <div>
            <h2>Attendance Records</h2>
            {attendance.length > 0 ? (
                <ul>
                    {attendance.map((record) => (
                        <li key={record.id}>{record.employee} - {record.date} - {record.status}</li>
                    ))}
                </ul>
            ) : (
                <p>No attendance records found.</p>
            )}
        </div>
    );
}

export default Attendance;
