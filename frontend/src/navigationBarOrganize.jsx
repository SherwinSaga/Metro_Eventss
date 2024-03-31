import React from 'react';

import './App.css'; 

function organizerNavBar() {
    return (
        <div>
            <div className="sidenav">
                <a href="#" class="w3-bar-item w3-button">Create Event</a>
                <a href="#" class="w3-bar-item w3-button">Edit Event</a>
                <a href="#" class="w3-bar-item w3-button">Events you Created</a>
            </div>
        </div>
    );
}

export default organizerNavBar;