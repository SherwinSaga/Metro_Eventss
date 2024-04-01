import React, { useEffect, useState } from 'react';
import NavigationBar from "./navigationBar";
import { getSessionUser, getSessionUserID } from "./helpers";

function Homepage(){
    const currUid = getSessionUserID();
    const [events, setEvents] = useState([]);
    const [participatedEvents, setParticipatedEvents] = useState([]);

    useEffect(() => {
  
        fetch('http://localhost:8000/events')
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(err => console.log(err));


        fetch(`http://localhost:8000/user_event_participated/${currUid}`)
            .then(res => res.json())
            .then(data => setParticipatedEvents(data))
            .catch(err => console.log(err));
    }, []);

    //Filter
    const nonParticipatedEvents = events.filter(event => !participatedEvents.some(pe => pe.uep_eventID === event.event_id));

    const handleJoin = (eventId) => {
        fetch('http://localhost:8000/user_event_participated', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uep_eventID: eventId,
                uep_userID: currUid,
            }),
        })
        .then(response => response.json())
        .then(data => {
            window.location.reload();
            setParticipatedEvents([...participatedEvents, data]);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return(
        <div>
            <NavigationBar />
            <h2>Events</h2>
            <div className="homepage_display">
                {nonParticipatedEvents.map(event => (
                    <div className="homepage_table_display"key={event.event_id}>
                        <h3>{event.event_name}</h3>
                        <p>Organized by: {event.event_organizer}</p>
                        <p>Location: {event.event_location}</p>
                        <p>Date: {new Date(event.event_date).toLocaleDateString()}</p>
                        <p>Time: {new Date(`1970-01-01T${event.event_time}Z`).toLocaleTimeString()}</p>
                        <p>Status: {event.event_isDone ? 'Done' : 'Not Done'}</p>
                        <button onClick={() => handleJoin(event.event_id)}>Join</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Homepage;