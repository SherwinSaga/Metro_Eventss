import React, { useState } from 'react';
import NavigationBar from './navigationBar';
import OrganizerNavBar from './navigationBarOrganize';
import { getSessionUserID} from './helpers';

import './App.css'; 

function OrganizerCreate() {
    const [event, setEvent] = useState({
        event_name: '',
        event_organizer: '',
        event_location: '',
        event_date: '',
        event_time: '',
        event_orgUID: getSessionUserID()
    });

    const handleChange = (e) => {
        setEvent({...event, [e.target.name]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        for (let key in event) {
            if (event[key] === '') {
                alert('Please fill out all fields.');
                return;
            }
        }
        const today = new Date();
        const eventDate = new Date(event.event_date);
        const diffTime = Math.abs(eventDate - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        if (diffDays < 7) {
            alert('Event date must be at least one week from today.');
            return;
        }
       
        fetch('http://localhost:8000/create_events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                event_name: event.event_name,
                event_organizer: event.event_organizer,
                event_location: event.event_location,
                event_date: event.event_date,
                event_time: event.event_time,
                event_orgUID: event.event_orgUID,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            if (data.message === 'Event created successfully!') {
                alert('Event created successfully!');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
    
    

    return (
        <div>
            <NavigationBar />
            <OrganizerNavBar />
            <div className="organizer_create">
                <h1>CREATE</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="event_name" onChange={handleChange} placeholder="Event Name" required />
                    <input type="text" name="event_organizer" onChange={handleChange} placeholder="Event Organizer" required />
                    <input type="text" name="event_location" onChange={handleChange} placeholder="Event Location" required />
                    <input type="date" name="event_date" onChange={handleChange} placeholder="Event Date" required />
                    <input type="time" name="event_time" onChange={handleChange} placeholder="Event Time" required />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default OrganizerCreate;
