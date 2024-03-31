import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import './App.css'; 

function organizerNavBar() {

    return (
        <div>
            <div className="sidenav">
                <Link className="sidenav-link" to="/organizer_create">Create Event</Link>
                <Link className="sidenav-link" to="/organizer_edit">Edit Event</Link>
                <Link className="sidenav-link" to="/organizer_events">Events you Created</Link>
            </div>
        </div>
    );
}

export default organizerNavBar;
