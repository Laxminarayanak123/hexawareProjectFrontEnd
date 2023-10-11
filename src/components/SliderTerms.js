import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { useParams, link, useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';


import img1 from '../images/Screenshot 2023-10-09 192758.png'
import img2 from '../images/Screenshot 2023-10-09 194052.png';


import img3 from '../images/c9450cc4-d1df-4027-8d09-57f6b14abe24 (1).jpeg';

const SliderTerms = ()=>{
    const {id} = useParams();
    const [termData,setTermData] = useState(null);
    const[termTax,setTermTax] = useState(null);


    useEffect(()=>{
        const getTermbyid = async ()=>{
            const res = await axios.get(`https://localhost:7180/api/TaxCalculator/termId/${id}`);
            console.log(res.data);
            setTermData(res.data);
          }
        getTermbyid();
    
        const getTaxByTerm = async()=>{
            const res = await axios.get(`https://localhost:7180/api/TaxCalculator/termSalary/${id}`);
            console.log(res.data);
            setTermTax(res.data);
        }
        getTaxByTerm();
    },[])

    return(

        <Layout>
            <div style={{width:'500px',height:'400px', margin:'auto'}}>
                {termData && termTax && (

                <Carousel>
                <Carousel.Item>
                    {/* <ExampleCarouselImage text="First slide" /> */}
                    <div style={{width:'500px',height:'400px', backgroundColor:'gray'}}> 
                        <img style={{width:'100%',height:'100%',objectFit:'fill'}} src={img1}></img>
                    </div>
                    <Carousel.Caption>
                    {/* <h3>First Year</h3> */}
                    <p>The Tax amount is ={'>'} <span style={{backgroundColor:'#0000ff3d',padding:'5px',borderRadius:'10px'}}>Rs {termTax.taxTerm1}</span> and the tax for the year is {termData.term1 ? <span style={{color:'green'}}>Paid</span>  : <span style={{color:'red'}}> Not Paid</span>} </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    {/* <ExampleCarouselImage text="Second slide" /> */}
                    <div style={{width:'500px',height:'400px', backgroundColor:'gray'}}> 
                        <img style={{width:'100%',height:'100%',objectFit:'fill'}} src={img3}></img>
                    </div>
                    <Carousel.Caption>
                    {/* <h3>Second Year</h3> */}
                    {/* <p>The Tax amount is ={'>'} Rs {termTax.taxTerm2} and the tax is {termData.Term2 > 0 ? '"paid"' : '"not paid"'} </p> */}
                    <p>The Tax amount is ={'>'} <span style={{backgroundColor:'#0000ff3d',padding:'5px',borderRadius:'10px'}}>Rs {termTax.taxTerm2}</span> and the tax for the year is {termData.term2 ? <span style={{color:'green'}}>Paid</span>  : <span style={{color:'red'}}> Not Paid</span>} </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    {/* <ExampleCarouselImage text="Third slide" /> */}
                    <div style={{width:'500px',height:'400px', backgroundColor:'gray'}}> 
                        <img style={{width:'100%',height:'100%',objectFit:'fill'}} src={img2}></img>
                    </div>
                    <Carousel.Caption>
                    {/* <h3>Third Year</h3> */}
                    <p>The Tax amount is ={'>'} <span style={{backgroundColor:'#0000ff3d',padding:'5px',borderRadius:'10px'}}>Rs {termTax.taxTerm3}</span> and the tax for the year is {termData.term3 ? <span style={{color:'green'}}>Paid</span>  : <span style={{color:'red'}}> Not Paid</span>} </p>
                    {/* <p>The Tax amount is ={'>'} Rs {termTax.taxTerm3} and the tax is {termData.Term3 > 0 ? '"paid"' : '"not paid"'} </p> */}
                    </Carousel.Caption>
                </Carousel.Item>
                </Carousel>
                )}
            </div>
        </Layout>
    )
}
export default SliderTerms;