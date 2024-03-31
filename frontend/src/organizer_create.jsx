import React from 'react';
import NavigationBar from './navigationBar';
import OrganizerNavBar from "./navigationBarOrganize";

import './App.css'; 

function organizer_create() {
    return (
        <div>
            <NavigationBar />
            <OrganizerNavBar />
            <div className="organizer_create">
                <h1>CREATE</h1>
            </div>
        </div>
    );
}

export default organizer_create;