import React, { useEffect, useState } from 'react';
import Admin_navigation from "./admin_navigation";

function Admin_requests(){
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        // Fetch all organizer applications
        fetch('http://localhost:8000/get_requests')
            .then(res => res.json())
            .then(data => setRequests(data))
            .catch(err => console.log(err));
    }, []);

    // Function to handle approve button click
    const handleApprove = (userId) => {
        fetch('http://localhost:8000/approve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                User_id: userId,
            }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            // Send notification
            fetch('http://localhost:8000/create_notify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: userId,
                    notif_type: "Organizer request: APPROVED",
                }),
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch((error) => console.error('Error:', error));
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
    
    const handleDeny = (userId) => {
        fetch(`http://localhost:8000/deny_request/${userId}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            // Send notification
            fetch('http://localhost:8000/create_notify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: userId,
                    notif_type: "Organizer request: REVOKED",
                }),
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch((error) => console.error('Error:', error));
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
    

    return(
        <div>
            <Admin_navigation />
            <h2>Pending Requests</h2>
            <div className="admin_request_display">
                {requests.map(request => (
                    <div className="admin_table_display"key={request.oa_id}>
                        <h3>{request.oa_username}</h3>
                        <p>User ID: {request.oa_userID}</p>
                        <button onClick={() => handleApprove(request.oa_userID)}>Approve</button>
                        <button onClick={() => handleDeny(request.oa_userID)}>Deny</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Admin_requests;
