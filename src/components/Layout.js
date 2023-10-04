import React from 'react';
import { useNavigate } from 'react-router-dom';


const Layout = ({ children }) => {
  const nav = useNavigate();

  function logoutFunc(){
    // var token= localStorage.getItem('token')
    localStorage.setItem('token',"null");
    nav('/login');    
  }
  function goBack(){
    nav(-1);
  }
  return (
    <div className="Add-BckImg-Dashboard">

    <div className="container-fluid bg-image">
      <div className="row">
        <div className="col">
          <header className="header">
            <div className='Logo-image'> <img src='https://cdn-icons-png.flaticon.com/512/2168/2168793.png' alt='logo' /> </div>
            <h1 className="logo" style={{fontFamily:'sans-serif', color:'blanchedalmond'}} >WeHelpTax</h1>
            <nav className="nav">
              <ul className="nav-list elementsLayout">
                <li style={{color:'cyan'}} className="nav-item"><a style={{color:'cyan'}} className="nav-link" href="/">Home</a></li>
                <li className="nav-item"><a style={{color:'cyan'}} className="nav-link" href="/dashboard">Dashboard</a></li>
                <li className="nav-item"><p style={{color:'cyan', cursor:'pointer'}} className="nav-link" onClick={logoutFunc} >logout</p></li>
              </ul>
            </nav>
          </header>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <main className="main-content">
            {children}
          </main>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div id='backFooter' onClick={goBack}>
           Back &#8592;
          </div>
          <footer className="footer">
            &copy; 2023 WHT
          </footer>
        </div>
      </div>
    </div>

    </div>
  );
};

export default Layout;
