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
            <h6 className='loginHeader'>ADMIN PORTAL</h6>
            <form onSubmit={handleSubmit}>
                <label className="userName">
                    USERNAME:
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Enter Username"
                    />
                </label>
                <label className="passWord">
                    PASSWORD:
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter password"
                    />
                </label>
                <input type="submit" value="SUBMIT" id="btnSubmit"/>
            </form>
            <p id="noAcc">Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    );
}

export default adminLogin;
