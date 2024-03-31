import React from 'react';
import NavigationBar from './navigationBar';
import OrganizerNavBar from "./navigationBarOrganize";
import './App.css'; 

function organizer_events() {
    return (
        <div>
            <NavigationBar />
            <OrganizerNavBar />
            <div className="organizer_events">
                <h1>EVENTS</h1>
            </div>
        </div>
    );
}

export default organizer_events;