import React from "react";
import Layout from "./Layout";
import { useNavigate } from 'react-router-dom';


function AdminPage() {
    const nav = useNavigate();
    var token= localStorage.getItem('token')
    if(token !== "null"){
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    
      return (
        <Layout> 
        <div className="admin-page-container">
          <h1 className="newFont" >Welcome Admin</h1>
          <div className="button-container">
            <div style={{marginBottom:'20px'}}>
              <button onClick={()=> nav('/admin/employee')} className="employee-button glow-on-hover">Employee</button>
              <button onClick={()=> nav('/admin/salary')} className="salary-button glow-on-hover">Salary</button>
            </div>
            <div>
              <button onClick={()=> nav('/admin/search')} className="employee-button glow-on-hover">Search</button>
              <button onClick={()=> nav('/admin/taxPayers')} className="salary-button glow-on-hover">TaxPayers</button>
            </div>
          </div>
          <div>
              <button onClick={()=> nav('/admin/terms')} className="salary-button glow-on-hover" style={{width:'200px'}}>Term Wise</button>
          </div>
        </div>
        </Layout>
    
      );
    }
    else{

      return(
        <Layout>
        <div className="admin-page-container">
          <h3 style={{color:"aliceblue"}}>Admin can only access this route</h3>
        </div>
        </Layout>
      )
    }

}

export default AdminPage;
