import React from 'react';
import NavigationBar from './navigationBar';
import OrganizerNavBar from "./navigationBarOrganize";
import './App.css'; 

function organizer_edit() {
    return (
        <div>
            <NavigationBar />
            <OrganizerNavBar />
            <div className="organizer_edit">
                <h1>EDIT</h1>
            </div>
        </div>
    );
}

export default organizer_edit;