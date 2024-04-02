import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationBar from './navigationBar';
import OrganizerNavBar from "./navigationBarOrganize";
import './App.css'; 

function OrganizerEdit() {
    const navigate = useNavigate();
    const location = useLocation();
    const eventId = location.state.eventId;
    const [event, setEvent] = useState({
        event_name: '',
        event_location: '',
        event_date: '',
        event_time: ''
    });

    useEffect(() => {
        fetch(`http://localhost:8000/events/${eventId}`)
            .then(res => res.json())
            .then(data => setEvent(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleChange = (e) => {
        setEvent({...event, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8000/organizer_edit_event/${eventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        })
        .then(response => response.json())
        .then(response => {
            if (response.message === "1") {
                alert('Event updated successfully!');

                fetch(`http://localhost:8000/user_event_participated_query/${eventId}`)
                .then(res => res.json())
                .then(data => {
                    data.forEach(user => {
                        const userId = user.uep_userID; 
                        //to do
                        //add notif type
                        fetch('http://localhost:8000/create_notify', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ 
                                userid: userId,
                                notif_type: "An Event you were participating was updated",
                            }), 
                        })
                        .then(res => res.json())
                        .then(response => {
                            if (response.message === "notified") {
                                console.log(`Notification created for user ${userId}`);
                            } else {
                                console.error('Failed to create notification.');
                            }
                        })
                        .catch(error => console.error('Error:', error));
                    });
                })
                .catch(error => console.error('Error:', error));
                
            } else {
                alert('Failed to update event.');
            }
        })
        .catch(error => console.error('Error:', error));
    
        navigate('/organizer_events');
    }
    
    
    return (
        <div>
            <NavigationBar />
            <OrganizerNavBar />
            <div className="organizer_edit">
                <h1>EDIT</h1>
                {event && (
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="event_name" value={event.event_name} onChange={handleChange} />
                        <input type="text" name="event_location" value={event.event_location} onChange={handleChange} />
                        <input type="date" name="event_date" value={event.event_date} onChange={handleChange} />
                        <input type="time" name="event_time" value={event.event_time} onChange={handleChange} />
                        <button type="submit">Save Changes</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default OrganizerEdit;
