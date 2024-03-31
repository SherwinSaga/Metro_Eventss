import React from 'react';
import { Link } from 'react-router-dom';
import { bootleg_logout } from './helpers';
import './App.css'; 


function Adminnavigation() {
    return (
        <div>
            <div className='topnav'>
                <Link className="topnav-link" to="/adminhomepage">Home</Link>
                <Link className="topnav-link" to="/admin_requests">Requests</Link>
                <Link className="topnav-link" to="/admin_events">List of Events</Link>
                <Link className="topnav-link" to="/admin_organizer">List of Organizers</Link>
                <Link className="topnav-link logout" to="/adminlogin" onClick={bootleg_logout}>Log Out</Link>
            </div>
        </div>
    );
}

export default Adminnavigation;
