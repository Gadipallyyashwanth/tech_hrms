import React, { useEffect, useState } from 'react';

function Leaves() {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLeaves() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/leaves/');
                const json = await response.json();
                console.log("Leaves API response:", json);
                setLeaves(json.data || []);  // Safely handle if json.data is undefined
            } catch (error) {
                console.error("Error fetching leaves:", error);
                setLeaves([]);
            } finally {
                setLoading(false);
            }
        }
        fetchLeaves();
    }, []);

    if (loading) return <p>Loading leave data...</p>;

    return (
        <div>
            <h2>Leave Records</h2>
            {leaves.length > 0 ? (
                <ul>
                    {leaves.map((leave) => (
                        <li key={leave.id}>
                            {leave.employee} - {leave.date} - {leave.reason} - {leave.status}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No leave records found.</p>
            )}
        </div>
    );
}

export default Leaves;
