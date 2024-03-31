import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

import './App.css'; 

function adminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault();
        
        fetch('http://localhost:8000/adminlogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                admin_username: username,
                admin_password: password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if(data.message === "1"){ //1 = true
                console.log(data.user);

                //pass kinsa ang current user sa session
                //this is a bootleg approach
                //http cookies much better pero gi tapol ko
                localStorage.setItem('user', JSON.stringify(data.user)); 
                navigate('/adminhomepage');
            } else {
                console.log(data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
    



    return (
        <div className="login-container">
            <h1>ADMIN PORTAL</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    );
}

export default adminLogin;
