import React, { useEffect, useState } from 'react';
import { getSessionUserID } from './helpers';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './navigationBar';
import OrganizerNavBar from "./navigationBarOrganize";
import './App.css'; 


function OrganizerEvents() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/events/${getSessionUserID()}`)
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleEdit = (eventId) => {
        // Handle event edit here
        navigate('/organizer_edit', { state: { eventId } });
    };

    const handleDelete = (eventId) => {
        fetch(`http://localhost:8000/organizer_delete_event/${eventId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: getSessionUserID(),
            }),
        })
        .then(response => {
            if (response.status === 204) {
                // Remove the deleted event from the state
                setEvents(events.filter(event => event.event_id !== eventId));
                alert('Event deleted successfully!');
            } else {
                console.error('Failed to delete event.');
                alert('Failed to delete event.');
            }
        })
        .catch(error => console.error('Error:', error));
    };
    

    return (
        <div>
            <NavigationBar />
            <OrganizerNavBar />
            <div className="organizer_events">
                <h1>EVENTS</h1>
                    {events.map(event => (
                        <div className="org_event_display"key={event.event_id}>
                            <h3>{event.event_name}</h3>
                            <p>Organized by: {event.event_organizer}</p>
                            <p>Location: {event.event_location}</p>
                            <p>Date: {new Date(event.event_date).toLocaleDateString()}</p>
                            <p>Time: {new Date(`1970-01-01T${event.event_time}Z`).toLocaleTimeString()}</p>
                            <button onClick={() => handleEdit(event.event_id)}>Edit</button>
                            <button onClick={() => handleDelete(event.event_id)}>Delete</button>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default OrganizerEvents;
