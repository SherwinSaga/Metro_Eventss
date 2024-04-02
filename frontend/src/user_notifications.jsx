import React, { useEffect, useState } from 'react';
import NavigationBar from "./navigationBar";
import { getSessionUserID } from "./helpers";

function UserNotifications() {
    const [unreadNotifications, setUnreadNotifications] = useState([]);
    const [readNotifications, setReadNotifications] = useState([]);
    const UID = getSessionUserID();

    useEffect(() => {
        fetchUnreadNotifications();
        fetchReadNotifications();
    }, [UID]);

    const fetchUnreadNotifications = () => {
        fetch(`http://localhost:8000/notifications_query_unread/${UID}`)
            .then(response => response.json())
            .then(data => setUnreadNotifications(data))
            .catch(error => console.error(error));
    };

    const fetchReadNotifications = () => {
        fetch(`http://localhost:8000/notifications_query_read/${UID}`)
            .then(response => response.json())
            .then(data => setReadNotifications(data))
            .catch(error => console.error(error));
    };

    const handleMarkAsRead = (notificationId) => {
        fetch(`http://localhost:8000/mark_as_read/${notificationId}`, { method: 'POST' })
            .then(() => {
                fetchUnreadNotifications();
                fetchReadNotifications();
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <NavigationBar />
            <h2>New Notifications</h2>
            <div className="my_notifications_display">
                {unreadNotifications.map(notification => (
                    <div className="mynotifications_table_display" key={notification.notification_id}>
                        <h3>Type: {notification.notification_type}</h3>
                        <button onClick={() => handleMarkAsRead(notification.notification_id)}>Mark as Read</button>
                    </div>
                ))}
            </div>
            <h2>Old Notifications</h2>
            <div className="my_notifications_display">
                {readNotifications.map(notification => (
                    <div className="mynotifications_table_display" key={notification.notification_id}>
                        <h3>Type: {notification.notification_type}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserNotifications;
