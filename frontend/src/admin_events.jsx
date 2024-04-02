import React, { useEffect, useState } from 'react';
import Admin_navigation from "./admin_navigation";

function Admin_events(){
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch all events
        fetch('http://localhost:8000/events')
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (eventId) => {
        fetch(`http://localhost:8000/events/${eventId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) { throw response }
            // Check if the response is empty
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json();
            } else {
                return {};
            }
        })
        .then(() => {
            window.location.reload();
        })
        .catch(err => {
            console.error('Error deleting event:', err);
        });
    };

    return(
        <div id="adminEvents">
            <Admin_navigation />
            <h2 id="admineventHeader">All Events</h2>
            <div className="admin_events">
                {events.map(event => (
                    <div className="admin_events_display"key={event.event_id}>
                        <h3>{event.event_name}</h3>
                        <p>event id: {event.event_id}</p>
                        <p>Organized by: {event.event_organizer}</p>
                        <p>Location: {event.event_location}</p>
                        <p>Date: {new Date(event.event_date).toLocaleDateString()}</p>
                        <p>Time: {new Date(`1970-01-01T${event.event_time}Z`).toLocaleTimeString()}</p>
                        <p>Status: {event.event_isDone ? 'Done' : 'Not Done'}</p>
                        <button onClick={() => handleDelete(event.event_id)} id="btnDel">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Admin_events;
