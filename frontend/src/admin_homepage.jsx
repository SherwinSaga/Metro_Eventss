import React, { useEffect, useState } from 'react';
import Admin_navigation from "./admin_navigation";
import './App.css'; 

function AdminHomepage(){
    const [pendingRequests, setPendingRequests] = useState(0);
    const [numEvents, setNumEvents] = useState(0);
    const [numOrganizers, setNumOrganizers] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8000/get_organizers')
            .then(res => res.json())
            .then(data => setNumOrganizers(data.length))
            .catch(err => console.log(err));

        fetch('http://localhost:8000/events')
            .then(res => res.json())
            .then(data => setNumEvents(data.length))
            .catch(err => console.log(err));

        fetch('http://localhost:8000/organizer_app')
            .then(res => res.json())
            .then(data => setPendingRequests(data.length))
            .catch(err => console.log(err));
    }, []);

    return(
        <div id="adminPage">
            <Admin_navigation />
            <div className="adminhomeDisplay">
                <h2>Statistics</h2>
                <p>Pending Requests: {pendingRequests}</p>
                <p>Number of Events: {numEvents}</p>
                <p>Number of Organizers: {numOrganizers}</p>
            </div>
        </div>
    );
}

export default AdminHomepage;
