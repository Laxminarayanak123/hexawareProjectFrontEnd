import { useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import Layout from "./Layout";

const SalaryCreate = () => {

    const [formData, setFormData] = useState({});


    const navigate=useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    
    const handlesubmit=(e)=>{
      e.preventDefault();
      
        // formData.departmentId = parseInt(formData.departmentId);

      
      axios.post(`https://localhost:7180/api/Salary/AddSal/?empId=${formData.empId}&sal=${formData.salary}`)
      .then((res)=>{
        // console.log('Saved successfully.')
        navigate('/admin/salary');
      }).catch((err)=>{
        console.log(err.message)
      })

    }
   
    return (
        <Layout>
        <div>

            <div className="row" style={{marginTop:'-50px' , marginBottom:'70px'}}>
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>

                        <div className="card" style={{"textAlign":"left"}}>
                            <div className="card-title">
                                <h2>Salary</h2>
                            </div>
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                        <label>
                                            Employee Id
                                            <input  type="text" name="empId" onChange={handleChange} className="form-control"/>
                                        </label>
                                        </div>
                                    </div>


                                    <div className="col-lg-12">
                                        <div className="form-group">
                                        <label>
                                            Salary
                                            <input type="text" name="salary" onChange={handleChange} className="form-control"/>
                                        </label>
                                        </div>
                                    </div>



                                    {/* <div className="col-lg-12">
                                        <div className="form-group">
                                        <label>
                                            Email:
                                            <input type="email" name="email" onChange={handleChange} className="form-control"/>
                                        </label>
                                        </div>
                                    </div>
                                    

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                        <label>
                                            Phone:
                                            <input  name="phoneNumber" onChange={handleChange} className="form-control"/>
                                        </label>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                        <label>
                                            Hire Date:
                                            <input  type="date" name="hireDate" onChange={handleChange} className="form-control"/>
                                        </label>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                        <label>
                                            Birth Date:
                                            <input  type="date" name="dateOfBirth" onChange={handleChange} className="form-control"/>
                                        </label>
                                        </div>
                                    </div>
                                    

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                        <label>
                                            Department id:
                                            <input  name="departmentId" onChange={handleChange} className="form-control"/>
                                        </label>
                                        </div>
                                    </div>
                             */}
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                           <button className="btn btn-success" type="submit">Save</button>
                                           <Link to="/admin/salary" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>

                </div>
            </div>
        </div>
        </Layout>
    );
}

export default SalaryCreate;