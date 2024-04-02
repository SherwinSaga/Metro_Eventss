import NavigationBar from "./navigationBar";
import { getSessionUserID, getSessionUser } from "./helpers";
import React, { useEffect, useState } from 'react';

function MyEvents(){
    const currentUser = getSessionUser();
    const currUid = getSessionUserID();
    const [events, setEvents] = useState([]);
    const [participatedEvents, setParticipatedEvents] = useState([]);

    useEffect(() => {
        // Fetch all events
        fetch('http://localhost:8000/events')
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(err => console.log(err));

        // Fetch events the user is participating in
        fetch(`http://localhost:8000/user_event_participated/${currUid}`)
            .then(res => res.json())
            .then(data => setParticipatedEvents(data.map(pe => pe.uep_eventID))) // Store only the event IDs
            .catch(err => console.log(err));
    }, []);

    // Filter the events to only include those the user is participating in
    const userEvents = events.filter(event => participatedEvents.includes(event.event_id));

    // Function to handle leave button click
    const handleLeave = (eventId) => {
        fetch(`http://localhost:8000/user_event_participated/${eventId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: currUid,
            }),
        })
        .then(() => {
            // Update the participatedEvents state
            setParticipatedEvents(participatedEvents.filter(id => id !== eventId));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return(
        <div id="eventsPage">
            <NavigationBar />
            <h2 id="headermyEvent">MY PARTICIPATING EVENTS</h2>
            <div className="my_events_display">
                {userEvents.map(event => (
                    <div className="myevents_table_display"key={event.event_id}>
                        <h3 id="myeventName">{event.event_name}</h3>
                        <p className="mgaP">Organized by: {event.event_organizer}</p>
                        <p className="mgaP">Location: {event.event_location}</p>
                        <p className="mgaP">Date: {new Date(event.event_date).toLocaleDateString()}</p>
                        <p className="mgaP">Time: {new Date(`1970-01-01T${event.event_time}Z`).toLocaleTimeString()}</p>
                        <p className="mgaP">Status: {event.event_isDone ? 'Done' : 'Not Done'}</p>
                        <button onClick={() => handleLeave(event.event_id)} id="btnLeave">LEAVE</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyEvents;