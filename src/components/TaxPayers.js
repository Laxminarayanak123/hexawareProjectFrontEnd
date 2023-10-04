import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams} from "react-router-dom";
import Layout from "./Layout";


const TaxPayers = ()=>{

const [taxData, setTaxData] = useState(null);
const navigate = useNavigate();
const LoadDetail = (id) => {
    navigate(`/admin/employee/detail/${id}`);
}

useEffect(()=>{
    const allPayments =async()=>{
        // const res = await axios.get(`https://localhost:7180/api/TaxCalculator/getAllPayments`);
        // var arr1 = res.data;
        // arr1.forEach( async(element) => {
        //     // console.log(element);
        //     const [datePart, timePart] = element.paymentTime.split('T');
        //     const [newTimePart,dummy] = timePart.split('.');
        //     element.paymentTime = datePart + " (" + newTimePart + ")";
        //     const response = await axios.get(`https://localhost:7180/api/Employee/GetEmpDetails/${element.empId}`);
        //     element.Fullname = response.data.firstName + " " + response.data.lastName;
        // });
        // console.log(arr1);
        // setTaxData(arr1);


        const res = await axios.get(`https://localhost:7180/api/TaxCalculator/getAllPayments`);
        const arr1 = res.data;

        const updatedData = [];

        function tConv24(time24) {
            var ts = time24;
            var H = +ts.substr(0, 2);
            var h = (H % 12) || 12;
            h = (h < 10)?("0"+h):h;  // leading 0 at the left for 1 digit hours
            var ampm = H < 12 ? " AM" : " PM";
            ts = h + ts.substr(2, 3) + ampm;
            return ts;
          };
        async function processData() {
        for (const element of arr1) {
            const [datePart, timePart] = element.paymentTime.split('T');
            const [newTimePart, dummy] = timePart.split('.');
            var veryNewTime = tConv24(newTimePart);
            console.log(newTimePart);
            element.paymentTime = datePart + " (" + veryNewTime + ")";

            const response = await axios.get(`https://localhost:7180/api/Employee/GetEmpDetails/${element.empId}`);
            element.Fullname = response.data.firstName + " " + response.data.lastName;

            updatedData.push(element);
        }

        console.log(updatedData);
        setTaxData(updatedData);
        }

        processData();

    }
    allPayments();

},[])

const getDateAndTime = async(dt)=>{
    const [datePart, timePart] = dt.split('T')
    return datePart;
}
return(
    <Layout>
        <div className="search-result animate__animated animate__fadeIn">
            <div className="mainContainer" style={{overflowY:'auto',maxHeight:'500px'}}>
                <div className="headingForUser one">
                    <h1>Tax Payers Table(2023-2024)</h1>
                </div>
                <div>
                    <table className="table" >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>EmpId</th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Date&Time</th>
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

                            
                        {taxData && 
                            taxData.map(item=>(
                                <tr key={item.id}>
                                    <td style={{color:"aliceblue"}}>{item.id}</td>
                                    <td onClick={() => { LoadDetail(item.empId) }}  style={{color:"aliceblue",cursor:'pointer'}}>{item.empId}</td>
                                    <td onClick={() => { LoadDetail(item.empId) }}  style={{color:"aliceblue",cursor:'pointer'}}>{item.Fullname}</td>
                                    <td style={{color:"aliceblue"}}>{item.amount}</td>
                                    <td style={{color:"cyan"}}>{item.paymentTime}</td>
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

export default TaxPayers;