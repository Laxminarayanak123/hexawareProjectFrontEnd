import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { useParams, link, useNavigate } from 'react-router-dom';

const CalculateTax = () => {
  const [taxInfo, setTaxInfo] = useState(null);
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
      setTaxInfo(response.data);
    };
    fetchTaxInfo();
  }, []);

  return (
    <Layout>
        <div className="tax-info-container">
        {taxInfo ? (
            <><table className="tax-info-table">
            <thead style={{color:'#495057'}}>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody >
              <tr key={taxInfo.id}>
                <td>{taxInfo.name}</td>
                <td>{taxInfo.email}</td>
                <td>{taxInfo.amount}</td>
              </tr>
            </tbody>
          </table>
          {(browserUserId)?(
            <div style={{display:'flex',justifyContent:'space-around',alignItems:'end'}}>
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
                <div className="button-borders" onClick={()=>{navigate(`/SliderTerms/${id}`)}}>
                  <button className="primary-button"> Check Year Wise
                  </button>
                </div>
            </div>
            
          ):(
              <div>
                <select className='venomSelect'>
                    <option disabled selected>--- Current Term(2023-2024) ---</option>
                    <option value={3}>● Term(2022-2023)</option>
                    <option value={2}>● Term(2021-2022)</option>
                    <option value={1}>● Term(2020-2021)</option>

                </select>
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

export default CalculateTax;
