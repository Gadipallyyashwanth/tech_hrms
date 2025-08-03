import React, { useEffect, useState } from 'react';

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNotifications() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/notifications/');
                const json = await response.json();
                console.log("Notifications API response:", json);
                setNotifications(json.data || []); // Safe fallback
            } catch (error) {
                console.error("Error fetching notifications:", error);
                setNotifications([]);
            } finally {
                setLoading(false);
            }
        }
        fetchNotifications();
    }, []);

    if (loading) return <p>Loading notifications...</p>;

    return (
        <div>
            <h2>Notifications</h2>
            {notifications.length > 0 ? (
                <ul>
                    {notifications.map(notification => (
                        <li key={notification.id}>
                            <strong>{notification.title}:</strong> {notification.message} ({notification.date})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No notifications available.</p>
            )}
        </div>
    );
}

export default Notifications;
