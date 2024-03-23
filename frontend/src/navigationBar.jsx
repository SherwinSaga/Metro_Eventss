import React from 'react';
import { Link } from 'react-router-dom';
import { bootleg_logout } from './helpers';
import './App.css'; 


function navigationBar() {
    return (
        <div>
            <div className='topnav'>
                <a class="active" ><Link to="/homepage">Home</Link></a>
                <a ><Link to="/myevents">My Events</Link></a>
                <a><Link to="/organize">Organize</Link></a>
                <a class="logout"><Link to="/" onClick={bootleg_logout}>Log Out</Link></a>
            </div>
        </div>
    );
}

export default navigationBar;
