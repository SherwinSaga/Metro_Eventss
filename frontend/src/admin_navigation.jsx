import React from 'react';
import { Link } from 'react-router-dom';
import { bootleg_logout } from './helpers';
import './App.css'; 


function Adminnavigation() {
    return (
        <div>
            <div className='topnav'>
                <a><Link to="/adminhomepage">Home</Link></a>
                <a><Link to="/admin_requests">Requests</Link></a>
                <a><Link to="/admin_events">List of Events</Link></a>
                <a><Link to="/admin_organizer">List of Organizers</Link></a>
                <a class="logout"><Link to="/adminlogin" onClick={bootleg_logout}>Log Out</Link></a>
                {/* to add*/}
            </div>
        </div>
    );
}

export default Adminnavigation;
