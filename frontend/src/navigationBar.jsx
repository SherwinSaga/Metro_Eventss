import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { bootleg_logout } from './helpers';
import './App.css'; 

function NavigationBar() {
    const navigate = useNavigate();

    const handleOrganizeClick = (event) => {
        event.preventDefault();
        navigate('/organizer_create');
    }

    return (
        <div>
            <div className='topnav'>
                <Link className="topnav-link" to="/homepage">Home</Link>
                <Link className="topnav-link" to="/myevents">My Events</Link>
                <Link className="topnav-link" to="/organize" onClick={handleOrganizeClick}>Organize</Link>
                <Link className="topnav-link logout" to="/" onClick={bootleg_logout}>Log Out</Link>
            </div>
        </div>
    );
}

export default NavigationBar;
