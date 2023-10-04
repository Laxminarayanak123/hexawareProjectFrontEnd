import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import GoogleOauthTest from './GoogleLogin';


const LoginPage = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const nav = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    axios.post('https://localhost:7180/api/Users/login', {Email, Password })
    .then(response => {
      console.log(response.data.token,response.status);
      if(response.data.token){
        
        localStorage.setItem('token',response.data.token.token)
        localStorage.setItem('empId',response.data.presentUserId)
        if(response.data.admin==="admin"){
          localStorage.setItem('admin',response.data.admin);
          nav('/admin');
        }
        else{
          localStorage.setItem('token','null')
          nav('/dashboard');
        }
      }
      else{
        console.log(response.data);
        nav('/register')
      }
    })
    .catch(error => {
      console.error(error);
    });

    console.log("login page");
  };

  return (
    <div className='loginDiv'>    
      <div className="page-container d-flex justify-content-center align-items-center ">
      <form onSubmit={handleLogin} className="border p-3 rounded loginContainer">
        <h1  className="text-center mb-3 fancy">Login</h1>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label" style={{color:'aliceblue'}}>Email:</label>
          <input type="email" id="Email" className="form-control" value={Email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label" style={{color:'aliceblue'}}>Password:</label>
          <input type="password" id="Password" className="form-control" value={Password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
           
          <Link to='/register'> <button  className='btn btn-danger'>register</button> </Link>
      </form>

    </div>
      <div id='googleBtn'>
        <GoogleOauthTest></GoogleOauthTest>
      </div>
    </div>

  );
};

export default LoginPage;
