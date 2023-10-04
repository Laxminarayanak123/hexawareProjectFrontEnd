import React , { useState } from "react";
import axios from "axios";
import Layout from "./Layout";
import { useNavigate} from 'react-router-dom';

const Search = ()=>{
    const [empid, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const navigate = useNavigate();

    // const handleSearch = async (event) => {
    //     event.preventDefault();
    //     try {
    //       const response = await axios.get(`https://localhost:7180/api/Employee/GetEmpDetails/${empid}`);
    //       const data = response.data;
    //       if (Array.isArray(data) && data.length > 0) {
    //         setSearchResults(data[0]);
    //       } else if (!Array.isArray(data) && data !== null) {
    //         setSearchResults(data);
    //       } else {
    //         let obj ={
    //           firstName:"No Name",
    //           lastName:"",
    //           email:"NoEmail.com"
    //         }
    //         setSearchResults(obj);
    //       }
    //     } catch (error) {
    //         if(error.response.status===404){
    //                 alert("No results found! , please try again")
    //                 let obj ={
    //                   firstName:"No Name",
    //                   lastName:"",
    //                   email:"NoEmail.com"
    //                 }
    //               setSearchResults(obj);
    //         }
    //     }
    //   };

      const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
      };
      const handleCalculate = (event) => {
        event.preventDefault();
    
        navigate(`/calculate/${searchResults.id}`);
      };
      const searchAjaxWay =async(value)=>{
          value = value.trim();
          try {
            const response = await axios.get(`https://localhost:7180/api/Employee/SearchEmpDetails/${value}`);
            var data = response.data;
            // data = data.pop();
            // console.log(data);
            setSearchResults(data);

          } catch (error) {
            if(error.response.status == 404){ 
              var data = [{
                id:'0',
                firstName:"No Name",
                lastName:"",
                email:"NoEmail.com"
              }];
              setSearchResults(data)
            }
          }
      }
      const handleTax = async(id)=>{
        console.log(id);
        if(id!=0){
          navigate(`/calculateTerm/${id}`);
        }
      }
    return(
        <Layout>
            <div className="dashboard">
            {/* <form onSubmit={searchAjaxWay}> */}
                <div className="input-group mb-3  Dashboard-searchForm" >
                <input
                    type="text"
                    className="form-control "
                    placeholder="Search by Employee Name"
                    onChange={handleSearchQueryChange}
                    onInput={(e)=>searchAjaxWay(e.target.value)}
                    style={{backgroundColor:'#212529',color:'aliceblue'}}
                />
                <button className="btn btn-primary" type="submit">
                    Search
                </button>
                </div>
            {/* </form> */}
            {searchResults && 
                searchResults.map(item => (
                  <div  key={item.id} onClick={()=>{handleTax(item.id)}} className="search-result animate__animated animate__fadeIn">
                    <div className="card mb-3">
                      <div className="card-body" style={{backgroundColor:'#212529',border:'1px solid aliceblue',cursor:'pointer'}}>
                      <h5 className="card-title" style={{color:'aliceblue'}}>{item.firstName+" "+ item.lastName}</h5>
                      <p className="card-text" style={{color:'aliceblue'}}>{item.email}</p>
                      </div>
                    </div>
                  </div>
                ))
                }
            {/* {searchResults && (
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

                    </div>
                </form>
                </div>
            )} */}

            </div>
        </Layout>
    )
};

export default Search;