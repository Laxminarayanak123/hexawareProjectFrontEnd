import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { useParams, link, useNavigate } from 'react-router-dom';

const CalculateTerm = () => {
  const [taxInfo, setTaxInfo] = useState(null);
  const [termData,setTermData] = useState(null);
  const[termTax,setTermTax] = useState(null);

  const browserUserId = localStorage.getItem('empId');
  // console.log(browserUserId);

  const {id} = useParams();
  const navigate = useNavigate();
  // console.log(id);

  const PayTax = () =>{
    navigate(`/payTax`);
  }
  const ViewReceipt =()=>{
    navigate(`/viewReceipt/${taxInfo.paymentId}`)
  }


  useEffect(() => {
    const fetchTaxInfo = async () => {
      const response = await axios.get(`https://localhost:7180/api/TaxCalculator/${id}`);
      console.log(response.data);
      setTaxInfo(response.data);
    };
    fetchTaxInfo();

    const getTermbyid = async ()=>{
        const res = await axios.get(`https://localhost:7180/api/TaxCalculator/termId/${id}`);
        // console.log(res.data);
        setTermData(res.data);
      }
    getTermbyid();

    const getTaxByTerm = async()=>{
        const res = await axios.get(`https://localhost:7180/api/TaxCalculator/termSalary/${id}`);
        // console.log(res.data);
        setTermTax(res.data);
    }
    getTaxByTerm();
  }, []);

    const clickSelect = (e)=>{
        console.log(e);
        const ele = document.getElementById('paidUnpaid')
        const amountele = document.getElementById('taxAmount');
        const currentTermEle = document.getElementById('CurrentTerm');
        if(e==1){
            currentTermEle.innerText = "Term-1(2020-2021)";
            amountele.innerText = termTax.taxTerm1;
            if(termData.term1){
                ele.innerText = "paid";
            }
            else{
                ele.innerText = "due";
            }
        }
        if(e==2){
            currentTermEle.innerText = "Term-2(2021-2022)";
            amountele.innerText = termTax.taxTerm2;
            if(termData.term2){
                ele.innerText = "paid";
            }
            else{
                ele.innerText = "due";
            }
        }
        if(e==3){
            currentTermEle.innerText = "Term-3(2022-2023)";
            amountele.innerText = termTax.taxTerm3;
            if(termData.term3){
                ele.innerText = "paid";
            }
            else{
                ele.innerText = "due";
            }
        }
    }
  return (
    <Layout>
        <div className="tax-info-container">
        {taxInfo ? (
            <>
                <h3 className='headerTerm' id='CurrentTerm'>Current Term(2023-2024)</h3>
            <table className="tax-info-table">
            <thead style={{color:'#495057'}}>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Tax Amount</th>
                <th>Paid</th>
              </tr>
            </thead>
            <tbody >
              <tr key={taxInfo.id}>
                <td>{taxInfo.name}</td>
                <td>{taxInfo.email}</td>
                <td id='taxAmount' >{taxInfo.amount}</td>
                <td id='paidUnpaid'>{taxInfo.paid ? ("paid"):("due")}</td>
              </tr>
            </tbody>
          </table>

          {(browserUserId)?(
            <div>
                {!taxInfo.paid?(
                  <button onClick={() => { PayTax() }} className='buttonTax'>
                    pay tax    
                  </button>
                ):(
                  <button onClick={() => { ViewReceipt() }} className='buttonTax'>
                    view receipt   
                  </button>
                )}
            </div>
            
          ):(
              <div>
                <select onChange={(e)=>{clickSelect(e.target.value)}}  className='venomSelect'>
                    <option disabled selected>------- Select Term -------</option>
                    <option value={3}>● Term(2022-2023)</option>
                    <option  value={2}>● Term(2021-2022)</option>
                    <option  value={1}>● Term(2020-2021)</option>

                </select>
                  <button className='buttonForCurrent' onClick={()=>{window.location.reload()}}>Current</button>

              </div>
          )}
          
          
          </>    
            
        ) : (
            <p style={{marginLeft:'400px',marginTop:"100px",color:"black", fontSize:"30px",fontWeight:"600"}}>Loading...</p>
        )}

        </div>
    </Layout>
  );
};

export default CalculateTerm;
