import React, { useState } from 'react';


function Register() {
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');

    

    const handleSubmit = event => {
        event.preventDefault();
        fetch('http://localhost:8000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                User_username: username,
                User_firstname: firstname,
                User_lastname: lastname,
                User_password: password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
    


    return (
        <div className="register-container">
            <h6 id="registerHeader">REGISTER</h6>
            <form onSubmit={handleSubmit}>
                <label id="usernameReg">
                    USERNAME:
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Enter Username"
                    />
                </label>
                <label label id="firstName">
                    FIRST NAME:
                    <input
                        type="text"
                        value={firstname}
                        onChange={e => setFirstname(e.target.value)}
                        placeholder="Enter Firstname"
                    />
                </label>
                <label id="secondName">
                    LAST NAME:
                    <input
                        type="text"
                        value={lastname}
                        onChange={e => setLastname(e.target.value)}
                        placeholder="Enter Lastname"
                    />
                </label>
                <label id="passwordReg">
                    PASSWORD:
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter password"
                    />
                </label>
                <input type="submit" value="REGISTER" id="btnsubmitReg"/>
            </form>
        </div>
    );
}

export default Register;
