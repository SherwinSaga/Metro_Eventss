import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './user_homepage';
import Login from './user_login';
import Register from './user_register';
import MyEvents from './user_myevents';
import Organize from './user_organize';
import AdminLogin from './admin_login';
import AdminHomepage from './admin_homepage';
import Admin_requests from './admin_requests';
import Admin_events from './admin_events';
import Admin_organizers from './admin_organizers';

function App(){
  
  //useless shit hantod useeffect
  //to delete
  const [data, setData] = useState([])
  

  useEffect(()=>{
    fetch('http://localhost:8000/user')
    .then(res=> res.json())
    .then(data => setData(data))
    .catch(err => console.log(err));
    
  }, []);

  useEffect(()=>{
    fetch('http://localhost:8000/admin')
    .then(res=> res.json())
    .then(data => setData(data))
    .catch(err => console.log(err));
    
  }, []);


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/myevents" element={<MyEvents/>} />
          <Route path="/organize" element={<Organize/>} />

          {/*admin routes */}
          <Route path="/adminlogin" element={<AdminLogin/>} />
          <Route path="/adminhomepage" element={<AdminHomepage/>} />
          <Route path="/admin_requests" element={<Admin_requests/>} />
          <Route path="/admin_events" element={<Admin_events/>} />
          <Route path="/admin_organizer" element={<Admin_organizers/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;