import { useEffect, useState  } from "react";
import axios from "axios";

import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "./Layout";

const SalEdit = () => {
    
    
    // const {id2} = useParams();
    var {id2} = useParams();
    // console.log(id2);
    
    const [formData, setFormData] = useState({});
    const [data, empdatachange] = useState(null);

    const [prevformData, prevsetFormData] = useState({ id:'',empId:'',salary1:''});



    const navigate=useNavigate();

    const handleChange = (e) => {
        // setFormData({ ...formData, [e.target.name]: e.target.value });
        // prevsetFormData({ firstName: e.target.value ,lastName: e.target.value , email:e.target.value , phoneNumber:e.target.value ,hireDate:e.target.value ,dateOfBirth:e.target.value ,departmentId:e.target.value })
        prevsetFormData({...formData, [e.target.name]: e.target.value})
      };

    
    const handlesubmit=(e)=>{
      e.preventDefault();
      
      
        // console.log(id2,prevformData);
        id2 = parseInt(id2);

        // prevformData.salary1 = parseFloat(prevformData.salary1);
      axios.put(`https://localhost:7180/api/Salary/UpdateSal/?id2=${id2}&salary1=${prevformData.salary1}`)
      .then((res)=>{
        // console.log('Saved successfully.')
        navigate('/admin/salary');
      }).catch((err)=>{ 
        console.log(err.message)
      })

    }

    
    useEffect(() => {
        axios.get(`https://localhost:7180/api/Salary/GetSal/${id2}`)
        .then((resp) => {
            const data = resp.data;
            // data.hireDate =data.hireDate.slice(0, 10);
            // data.dateOfBirth =data.dateOfBirth.slice(0, 10);;

            prevsetFormData({id:data.id,empId:data.empId,salary1:data.salary1})
            // console.log(data);
        }).catch((err) => {
            console.log(err.message);
        })
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
                                            Salary:
                                            <input placeholder={prevformData.salary1} name="salary1" onChange={handleChange} className="form-control"/>
                                        </label>
                                        </div>
                                    </div>
                            
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

export default SalEdit;