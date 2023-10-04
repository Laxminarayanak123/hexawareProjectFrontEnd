import React from 'react';
import { Link } from 'react-router-dom';
import LoginPage from './LoginPage';

function HomePage() {
  return (
    <div className="homepage">
      <div className="homepage-content">
        <h1 style={{textDecoration:'underline', color:"orange" , fontFamily:'sans-serif'}}>WeHelpTax</h1>
        <p style={{fontFamily:'sans-serif'}}>Get help with your taxes from the comfort of your own home.</p>
        <Link to="/login" className="btn btn-primary">Get Started</Link>      
      </div>
    </div>
  );
}

export default HomePage;