import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "./Layout";


const EmpDetail = () => {
    
    const { id } = useParams();
    const [empdata, empdatachange] = useState({});

    useEffect(() => {
        axios.get(`https://localhost:7180/api/Employee/GetEmpDetails/${id}`)
        .then((resp) => {
            console.log(resp.data);
            empdatachange(resp.data);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    return (
        <Layout>
        {empdata && (
        <div key={empdata.id} className="search-result animate__animated animate__fadeIn">
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
                          <td>{empdata.id}</td>
                      </tr>
                      <tr>
                          <td>Name</td>
                          <td>{empdata.firstName+" "+empdata.lastName}</td>
                      </tr>
                      <tr>
                          <td>Email</td>
                          <td>{empdata.email}</td>
                      </tr>
                      <tr>
                          <td>Phone number</td>
                          <td>{empdata.phoneNumber}</td>
                      </tr>
                      <tr>
                          <td>Date Of Birth</td>
                          <td>{empdata.dateOfBirth}</td>
                      </tr>
                      <tr>
                          <td>Hire Date</td>
                          <td>{empdata.hireDate}</td>
                      </tr>
                      <tr>
                          <td>Department ID</td>
                          <td>{empdata.departmentId}</td>
                      </tr>
                      {/* <tr>
                          <td>Row 7, Cell 1</td>
                          <td>Row 7, Cell 2</td>
                      </tr> */}
                  </tbody>
                </table>
            </div>
        </div>
        
      </div>
      )}
        </Layout>
    );
}

export default EmpDetail;