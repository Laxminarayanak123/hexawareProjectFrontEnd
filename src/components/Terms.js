import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams} from "react-router-dom";
import Layout from "./Layout";


const Terms = ()=>{

const [termData, setTermData] = useState(null);
const navigate = useNavigate();
const LoadDetail = (id) => {
    navigate(`/admin/employee/detail/${id}`);
}

useEffect(()=>{
    const allTerms =async()=>{
        const res = await axios.get(`https://localhost:7180/api/TaxCalculator/getTerms`);
        console.log(res.data);

        const arr1 = res.data;

        const updatedData = [];

        async function processData() {
            for (const element of arr1) {    
                const response = await axios.get(`https://localhost:7180/api/Employee/GetEmpDetails/${element.empId}`);
                element.Fullname = response.data.firstName + " " + response.data.lastName;
    
                updatedData.push(element);
            }
            setTermData(updatedData);
        }
        processData();
    }
    allTerms();

},[])

return(
    <Layout>
        <div className="search-result animate__animated animate__fadeIn">
            <div className="mainContainer" style={{overflowY:'auto',maxHeight:'500px'}}>
                <div className="headingForUser one">
                    <h1>Tax Payers Table</h1>
                </div>
                <div>
                    <table className="table" >
                    <thead>
                        <tr>
                            <th>EmpId</th>
                            <th>Name</th>
                            <th>Term1</th>
                            <th>Term2</th>
                            <th>Term3</th>
                        </tr>
                    </thead>
                    <tbody >
                        {/* {taxData && 
                            taxData.map(async(item)=>{
                                return(
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.empId}</td>
                                        <td>{item.amount}</td>
                                    </tr>
                                    )                    
                            }
                            )} */}

                            
                        {termData && 
                            termData.map(item=>(
                                <tr key={item.id}>
                                    <td style={{color:"aliceblue"}}>{item.empId}</td>
                                    <td onClick={() => { LoadDetail(item.empId) }}  style={{color:"aliceblue",cursor:'pointer'}}>{item.Fullname}</td>
                                    {/* <td style={{color:"aliceblue"}}>{item.term1 ? ("Paid"):("Due")}</td> */}
                                    {/* <td style={{color:"aliceblue"}}>{item.term2 ? ("Paid"):("Due")}</td> */}
                                    {/* <td style={{color:"aliceblue"}}>{item.term3 ? ("Paid"):("Due")}</td> */}
                                    {item.term1 ?(<td style={{color:"#00ff00"}}>Paid</td>):(<td style={{color:"Red"}}>Due</td>)}
                                    {item.term2 ?(<td style={{color:"#00ff00"}}>Paid</td>):(<td style={{color:"Red"}}>Due</td>)}
                                    {item.term3 ?(<td style={{color:"#00ff00"}}>Paid</td>):(<td style={{color:"Red"}}>Due</td>)}

                                </tr>
                            ))
                            }
                        
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </Layout>
)
}

export default Terms;