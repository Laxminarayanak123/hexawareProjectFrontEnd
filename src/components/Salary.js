import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./Layout";

const SalListing = () => {
    const [saldata, saldatachange] = useState(null);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate(`/admin/salary/detail/${id}`);
    }
    const LoadEdit = (id) => {
        const id2 = id
        navigate(`/admin/salary/edit/${id2}`);
    }
    const AddNewfunction =() =>{
        navigate(`/admin/salary/post`);
        
    }
    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            // console.log(id);
             axios.delete(`https://localhost:7180/api/Salary/DeleteSal/${id}`)
             .then((res) => {
                console.log(res);
                alert('Removed successfully.')
                window.location.reload('/admin/salary');
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }




    useEffect(() => {
        axios.get("https://localhost:7180/api/Salary")
        .then((resp) => {
            saldatachange(resp);
            // console.log(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])
    return (
        <Layout>
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Employee Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <button onClick={() => { AddNewfunction() }} className="btn btn-success">Add New (+)</button>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Emp Id</td>
                                <td>Salary</td>
                                
                            </tr>
                        </thead>
                        <tbody>

                            {saldata &&
                                saldata.data.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.empId}</td>
                                        <td>{item.salary1}</td>
                                        
                                        <td>
                                            <button onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</button>
                                            <button onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</button>
                                            {/* <button onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">Details</button> */}
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
        </Layout>
    );
}

export default SalListing;