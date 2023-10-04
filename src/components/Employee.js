import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./Layout";

const EmpListing = () => {
    const [empdata, empdatachange] = useState(null);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate(`/admin/employee/detail/${id}`);
    }
    const LoadEdit = (id) => {
        navigate(`/admin/employee/edit/${id}`);
    }
    const AddNewfunction =() =>{
        navigate(`/admin/employee/post`);
        
    }
    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            console.log(id);
             axios.delete(`https://localhost:7180/api/Employee/DeleteEmp/${id}`)
             .then((res) => {
                console.log(res);
                alert('Removed successfully.')
                window.location.reload('/admin/employee');
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }




    useEffect(() => {
        axios.get("https://localhost:7180/api/Employee")
        .then((resp) => {
            empdatachange(resp);
            console.log(resp);
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
                                <td>Name</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>

                            {empdata &&
                                empdata.data.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td><button onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</button>
                                            <button onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</button>
                                            <button onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">Details</button>
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

export default EmpListing;