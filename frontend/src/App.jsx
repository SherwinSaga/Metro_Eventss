import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './homepage';
import Login from './login';
import Register from './register';
import MyEvents from './myevents';
import Organize from './organize';
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

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/myevents" element={<MyEvents/>} />
          <Route path="/organize" element={<Organize/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;