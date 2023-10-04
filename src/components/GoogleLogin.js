import React from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";


const GoogleOauthTest = () => {

    const nav = useNavigate();


    //   registraton using google
    const registerUser = (user)=>{

        const Username = user.name;
        const Email = user.email;
        const Password = user.sub;

        axios.post('https://localhost:7180/api/Users/register', { Username ,Email, Password })
        .then(response => {
            if(response.status===200){
            
              console.log(response.data,response.status);
            loginUser(user)
            
            }
            else if(response.status===409){
              console.log(response.data);
              nav('/login');
            }
          })
          .catch(error => {
            console.error(error);
          });
    }

    const loginUser = async(user)=>{
        const Email = user.email;
        const Password = user.sub;

        await axios.post('https://localhost:7180/api/Users/login', {Email, Password })
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
    }

    const handleSuccess = async(response) => {
        // Handle successful authentication
        const user = jwt_decode(response.credential)
        console.log('Authenticated!',user);

        // check for users whether they are in user table
        const check = await axios.post(`https://localhost:7180/api/Users/check/${user.email}`);
        if(check.data){
            loginUser(user);
        }
        else{
            registerUser(user)
        }
        

  };

  const handleFailure = (error) => {
    // Handle authentication failure
    console.error('Authentication failed:', error);
  };

  return (
    <div>
      <GoogleOAuthProvider clientId="37099103882-oamqfkog57m563c9t5r3k7e8gg5sg90s.apps.googleusercontent.com">
        <GoogleLogin
                onSuccess={credentialResponse => {
                    // console.log(credentialResponse);
                    handleSuccess(credentialResponse);
                }}
                onError={() => {
                    // console.log('Login Failed');
                    handleFailure();
                }}
        />;
      </GoogleOAuthProvider>;
    </div>
  );
};

export default GoogleOauthTest;
