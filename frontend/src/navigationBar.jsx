import {React, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { bootleg_logout, getSessionUserID } from './helpers';
import './App.css'; 

function NavigationBar() {
    const navigate = useNavigate();
    const UID = getSessionUserID();
    const [isOrganizer, setIsOrganizer] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8000/isOrganizer?userId=${UID}`)
            .then(response => response.json())
            .then(data => {
                setIsOrganizer(data.isOrganizer);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [UID]);

    const handleOrganizeClick = (event) => {
        if(isOrganizer){
            event.preventDefault();
            navigate('/organizer_create');
        }
    }

    return (
        <div>
            <div className='topnav'>
                <Link className="topnav-link" to="/homepage">Home</Link>
                <Link className="topnav-link" to="/myevents">My Events</Link>
                <Link className="topnav-link" to="/organize" onClick={handleOrganizeClick}>Organize</Link>
                <Link className="topnav-link logout" to="/" onClick={bootleg_logout}>Log Out</Link>
                <Link className="topnav-link logout" to="/notifications" >Notifications</Link>
            </div>
        </div>
    );
}

export default NavigationBar;
