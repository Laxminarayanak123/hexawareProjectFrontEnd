import { useEffect, useState  } from "react";
import axios from "axios";

import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "./Layout";

const EmpEdit = () => {
    
    
    const {id} = useParams();
    
    const [formData, setFormData] = useState({});
    const [data, empdatachange] = useState(null);

    const [prevformData, prevsetFormData] = useState({ id:'',firstName: '',lastName: '', email: '', phoneNumber:'',hireDate:'',dateOfBirth:'',departmentId:''});

    const[depData,setDepData] =useState(null);

    const navigate=useNavigate();

    const handleChange = (e) => {
        // setFormData({ ...formData, [e.target.name]: e.target.value });
        // prevsetFormData({ firstName: e.target.value ,lastName: e.target.value , email:e.target.value , phoneNumber:e.target.value ,hireDate:e.target.value ,dateOfBirth:e.target.value ,departmentId:e.target.value })
        prevsetFormData({...formData, [e.target.name]: e.target.value})
      };

    
    const handlesubmit=(e)=>{
      e.preventDefault();
      
        prevformData.departmentId = parseInt(prevformData.departmentId);
      
      axios.put(`https://localhost:7180/api/Employee/Update/${id}`,prevformData)
      .then((res)=>{
        console.log('Saved successfully.')
        navigate('/admin/employee');
      }).catch((err)=>{
        console.log(err.message)
      })

    }

    
    useEffect(() => {
        axios.get(`https://localhost:7180/api/Employee/GetEmpDetails/${id}`)
        .then((resp) => {
            const data = resp.data;
            prevsetFormData({id:data.id,firstName: data.firstName,lastName: data.lastName, email:data.email, phoneNumber:data.phoneNumber,hireDate:data.hireDate,dateOfBirth:data.dateOfBirth,departmentId:data.departmentId})
            console.log(data);
        }).catch((err) => {
            console.log(err.message);
        })

            axios.get(`https://localhost:7180/api/Department/`)
            .then((resp)=>{
                setDepData(resp.data);
                console.log(resp.data);
            });
    }, [])
   
    return (
        <Layout>
        <div>

            <div className="row" style={{marginTop:'-50px' , marginBottom:'70px'}}>
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>

                        <div className="card" style={{"textAlign":"left"}}>
                            <div className="card-title">
                                <h2>Edit Employee</h2>
                            </div>
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                        <label>
                                            First Name:
                                            <input placeholder={prevformData.firstName} type="text" name="firstName" onChange={handleChange} className="form-control"/>
                                        </label>
                                        </div>
                                    </div>


                                    <div className="col-lg-12">
                                        <div className="form-group">
                                        <label>
                                            Last Name:
                                            <input placeholder={prevformData.lastName} type="text" name="lastName" onChange={handleChange} className="form-control"/>
                                        </label>
                                        </div>
                                    </div>



                                    <div className="col-lg-12">
                                        <div className="form-group">
                                        <label>
                                            Email:
                                            <input placeholder={prevformData.email} type="email" name="email" onChange={handleChange} className="form-control"/>
                                        </label>
                                        </div>
                                    </div>
                                    

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                        <label>
                                            Phone:
                                            <input placeholder={prevformData.phoneNumber} name="phoneNumber" onChange={handleChange} className="form-control"/>
                                        </label>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                        <label>
                                            Hire Date:
                                            <input placeholder={prevformData.hireDate} type="date" name="hireDate" onChange={handleChange} className="form-control"/>
                                        </label>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                        <label>
                                            Birth Date:
                                            <input placeholder={prevformData.dateOfBirth} type="date" name="dateOfBirth" onChange={handleChange} className="form-control"/>
                                        </label>
                                        </div>
                                    </div>
                                    

                                    <div className="col-lg-12" style={{marginBottom:'20px'}}>
                                        <div className="form-group">
                                        <label>
                                            Department:
                                            {/* <input placeholder={prevformData.departmentId} name="departmentId" onChange={handleChange} className="form-control"/> */}
                                            <select name="departmentId" onChange={handleChange} className="form-control">
                                                {/* <option disabled selected>--select a department--</option> */}
                                                {depData &&depData.map(item =>(
                                                    <option selected={item.id === prevformData.departmentId}  value={item.id}>{item.name}</option>
                                                ))}
                                            </select>
                                        </label>
                                        </div>
                                    </div>
                            
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                           <button className="btn btn-success" type="submit">Save</button>
                                           <Link to="/admin/employee" className="btn btn-danger">Back</Link>
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

export default EmpEdit;