import React, { useEffect, useState } from 'react';
import Admin_navigation from "./admin_navigation";

function Admin_organizers(){
    const [organizers, setOrganizers] = useState([]);

    useEffect(() => {
        // Fetch all organizers
        fetch('http://localhost:8000/get_organizers')
            .then(res => res.json())
            .then(data => setOrganizers(data))
            .catch(err => console.log(err));
    }, []);

    const handleRevoke = (userId) => {
        fetch(`http://localhost:8000/revoke_organizer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
            }),
        })
        .then(response => {
            if (!response.ok) { throw response }
            // Only try to parse as JSON if the response is not empty
            return response.text().then(text => text ? JSON.parse(text) : {})
        })
        .then(() => {
            // Create a notification after revoking the status
            fetch(`http://localhost:8000/create_notify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: userId,
                    notif_type: "Organizer Permissions: Revoked",
                }),
            })
            .then(response => {
                if (!response.ok) { throw response }
                return response.text().then(text => text ? JSON.parse(text) : {})
            })
            .then(() => {
                window.location.reload();
            })
            .catch(err => {
                console.error('Error creating notification:', err);
            });
        })
        .catch(err => {
            console.error('Error revoking organizer status:', err);
        });
    };
    
    

    return(
        <div>
            <Admin_navigation />
            <h2>All Organizers</h2>
            <div className="admin_organizers">
                {organizers.map(organizer => (
                    <div className="admin_organizers_display"key={organizer.User_id}>
                        <h3>{organizer.User_username}</h3>
                        <p>First Name: {organizer.User_firstname}</p>
                        <p>Last Name: {organizer.User_lastname}</p>
                        <button onClick={() => handleRevoke(organizer.User_id)}>Revoke Organizer Status</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Admin_organizers;
