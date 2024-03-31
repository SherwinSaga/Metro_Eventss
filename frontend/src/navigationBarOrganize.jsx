import React from 'react';
import { Link } from 'react-router-dom';

import './App.css'; 

function organizerNavBar() {
    return (
        <div>
            <div className="sidenav">
                <Link className="sidenav-link" to="/">Create Event</Link>
                <Link className="sidenav-link" to="/">Edit Event</Link>
                <Link className="sidenav-link" to="/">Events you Created</Link>
            </div>
        </div>
    );
}


export default organizerNavBar;