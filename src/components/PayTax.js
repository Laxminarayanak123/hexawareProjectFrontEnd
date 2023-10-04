import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import Layout from "./Layout";

const PayTax = () => {
    const navigate = useNavigate();
    const [taxInfo, setTaxInfo] = useState(null);
    const empId = localStorage.getItem('empId')
    const [userData,setUserData] = useState(null);

    
    
    useEffect(() => {
        

        const getDetails =async(event)=>{
            const response = await axios.get(`https://localhost:7180/api/Employee/GetEmpDetails/${empId}`);
            setUserData(response.data);
          }
          getDetails();

          const fetchTaxInfo = async () => {
            const response = await axios.get(`https://localhost:7180/api/TaxCalculator/${empId}`);
            setTaxInfo(response.data);
          };
          fetchTaxInfo();
          
      },[]);


      const taxValidate =(e)=>{
        // console.log(e.target.value,taxInfo.amount);
        const btn = document.getElementById('taxBtn');
        if(e.target.value == taxInfo.amount){
            // console.log("same same");
            btn.removeAttribute("disabled");
        }
        else{
            if (!btn.hasAttribute("disabled")) {
                btn.setAttribute("disabled", "true");
              }
        }
      }
        const taxation =async (e)=>{
            e.preventDefault();
            // console.log(taxInfo.amount);
            const Amount = taxInfo.amount.toString();
            const response = await axios.post(`https://localhost:7180/api/TaxCalculator/payment/?empid=${empId}&Amount=${Amount}`)
            .then((res)=>{
                console.log(res.data);

                alert("Payment Successfull!");
                // console.log(taxInfo);
                navigate(`/viewReceipt/${res.data}`);
            })
            .catch((err)=>{
                 console.log(err.message)
            });

        }
    return(
        <Layout>
            <div>
            {taxInfo && userData ? (
                <div className="credit-card-form">
                        <h2>PAYMENT PORTAL</h2>
                        <img className="Image1" src="https://i.ibb.co/hgJ7z3J/6375aad33dbabc9c424b5713-card-mockup-01.png" alt="6375aad33dbabc9c424b5713-card-mockup-01" border="0"></img>
                        <form onSubmit={(e)=>{taxation(e)}}>
                            <div className="form-group">
                                <label>{userData.firstName+" "+userData.lastName}</label>
                                {/* <input type="text" id="card-number" placeholder="Card number"></input> */}
                            </div>
                            {/* <div class="form-group">
                                <label for="card-holder">Card Holder</label>
                                <input type="text" id="card-holder" placeholder={userData.firstName+" "+userData.lastName}></input>
                            </div>
                            <div class="form-row">
                                <div class="form-group form-column">
                                <label for="expiry-date">Expiry Date</label>
                                <input type="text" id="expiry-date" placeholder="MM/YY"></input>
                                </div>
                                <div class="form-group form-column">
                                <label for="cvv">CVV</label>
                                <input type="text" id="cvv" placeholder="CVV"></input>
                                </div>
                            </div> */}
                            <div style={{marginBottom:'30px'}}>
                                <h3 style={{fontFamily:'fangsong', fontWeight:'bold'}}>The Bill for Tax is <span style={{color:'firebrick'}}>{taxInfo.amount}</span></h3>
                            </div>
                            <div className="form-group">
                                <label htmlFor="card-holder">Input the Amount</label>
                                <input type="text" id="card-holder" onChange={(e)=>{ taxValidate(e);}} placeholder={taxInfo.amount} required></input>
                                <p><span style={{color:'red',verticalAlign:'sub',fontSize:'20px'}}>*</span> type the same value as above</p>
                            </div>
                            <button id="taxBtn" type="submit" className="click-button" disabled>PAY NOW - ₹(TOTAL)</button>
                        </form>
                </div>
            
        ) : (
            <p style={{marginLeft:'400px',marginTop:"100px",color:"black", fontSize:"30px",fontWeight:"600"}}>Loading...</p>
        )}
            </div>
        </Layout>
    )
}

export default PayTax;