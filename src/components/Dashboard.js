import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Layout from "./Layout";


export function Dashboard() {
  const [empid, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [userData,setUserData] = useState(null);
  const navigate = useNavigate();
  

  const empId = localStorage.getItem('empId');

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://localhost:7180/api/Employee/GetEmpDetails/${empid}`);
      const data = response.data;
      if (Array.isArray(data) && data.length > 0) {
        setSearchResults(data[0]);
      } else if (!Array.isArray(data) && data !== null) {
        setSearchResults(data);
      } else {
        let obj ={
          firstName:"No Name",
          lastName:"",
          email:"NoEmail.com"
        }
        setSearchResults(obj);
      }
    } catch (error) {
        if(error.response.status===404){
                alert("No results found! , please try again")
                let obj ={
                  firstName:"No Name",
                  lastName:"",
                  email:"NoEmail.com"
                }
              setSearchResults(obj);
        }
    }
  };

  
  useEffect(()=>{
    const getDetails =async(event)=>{
      const response = await axios.get(`https://localhost:7180/api/Employee/GetEmpDetails/${empId}`);
      // const userData = response.data;
      // let obj ={
      //   firstName:"No Name",
      //   lastName:"",
      //   email:"NoEmail.com"
      // }
      setUserData(response.data);
    }
    getDetails();
  },[])
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCalculate = (event) => {
    event.preventDefault();

    navigate(`/calculate/${empId}`);
  };

  return (
    <Layout>

    <div className="dashboard">
      {/* <form onSubmit={handleSearch}>
        <div className="input-group mb-3  Dashboard-searchForm" >
          <input
            type="text"
            className="form-control "
            placeholder="Search by EmpId"
            value={empid}
            onChange={handleSearchQueryChange}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </form> */}
      {searchResults && (
        <div key={searchResults.id} className="search-result animate__animated animate__fadeIn">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{searchResults.firstName+" "+searchResults.lastName}</h5>
              <p className="card-text">{searchResults.email}</p>
            </div>
          </div>
          <form onSubmit={handleCalculate}>
            <div className="input-group mb-3">
              {searchResults.id && (

                <button className="btn btn-primary" type="submit">
                  Value Tax
                </button>
              )}
              {/* {!searchResults.id && (
                  <button className="btn btn-primary">
                    cannot Calculate
                  </button>
              )} */}
            </div>
          </form>
        </div>
      )}

      {/* individual data showing */}
      {userData && (
        <div key={userData.id} className="search-result animate__animated animate__fadeIn">
        {/* <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{userData.firstName+" "+userData.lastName}</h5>
            <p className="card-text">{userData.email}</p>
          </div>
        </div> */}
        <div className="mainContainer ">
            <div className="headingForUser one">
                  <h1>User Data</h1>
            </div>
            <div>
                <table  className="table">
                  <thead>
                    <tr>
                        <th>Type</th>
                        <th>Value</th>
                    </tr>
                  </thead>
                  <tbody style={{color:'#fff3cd'}}>
                      <tr>
                          <td>ID</td>
                          <td>{userData.id}</td>
                      </tr>
                      <tr>
                          <td>Name</td>
                          <td>{userData.firstName+" "+userData.lastName}</td>
                      </tr>
                      <tr>
                          <td>Email</td>
                          <td>{userData.email}</td>
                      </tr>
                      <tr>
                          <td>Phone number</td>
                          <td>{userData.phoneNumber}</td>
                      </tr>
                      <tr>
                          <td>Date Of Birth</td>
                          <td>{userData.dateOfBirth}</td>
                      </tr>
                      <tr>
                          <td>Hire Date</td>
                          <td>{userData.hireDate}</td>
                      </tr>
                      <tr>
                          <td>Department ID</td>
                          <td>{userData.departmentId}</td>
                      </tr>
                      {/* <tr>
                          <td>Row 7, Cell 1</td>
                          <td>Row 7, Cell 2</td>
                      </tr> */}
                  </tbody>
                </table>
                <form onSubmit={handleCalculate} className="valueTax">
                  {userData.id && (

                    <button className="btn btn-primary" type="submit">
                      Value Tax
                    </button>
                  )}
                  {/* {!searchResults.id && (
                      <button className="btn btn-primary">
                        cannot Calculate
                      </button>
                  )} */}
              </form>
            </div>
        </div>
        
      </div>
      )}

    </div>

    </Layout>
  );
}
