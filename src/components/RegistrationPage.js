import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';

const RegisterPage = () => {
  const [Username, setUname] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  var nav = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    axios.post('https://localhost:7180/api/Users/register', { Username ,Email, Password })
    .then(response => {
      if(response.status===200){
        
        console.log(response.data,response.status);
        
        nav('/login');
      }
      else if(response.status===409){
        console.log(response.data);
        nav('/register')
      }
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <div className='loginDiv'>    
    <div className="page-container d-flex justify-content-center align-items-center">
      <form onSubmit={handleRegister} className="border p-3 rounded loginContainer">
        <h1 className="text-center mb-3 fancy">Register</h1>
        <div className="mb-3">
          <label htmlFor="Username" className="form-label" style={{color:'aliceblue'}}>Username:</label>
          <input type="text" id="Username"  className="form-control" value={Username} onChange={(e) => setUname(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label" style={{color:'aliceblue'}}>Email:</label>
          <input type="email" id="email" className="form-control" value={Email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label" style={{color:'aliceblue'}}>Password:</label>
          <input type="password" id="password" className="form-control" value={Password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {/* <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">Confirm Password:</label>
          <input type="password" id="confirm-password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div> */}
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
    </div>
  );
};

export default RegisterPage;
