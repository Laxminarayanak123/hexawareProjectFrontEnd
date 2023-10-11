import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegistrationPage';
import HomePage from './components/Homepage';
import { Dashboard } from './components/Dashboard';
import Home from './components/Testing';
import CalculateTax from './components/CalculateTax';
import AdminPage from './components/Admin';
import EmpListing from './components/Employee';
import EmpDetail from './components/EmpDetail';
import EmpCreate from './components/EmpCreate';
import EmpEdit from './components/EmpEdit';
import SalListing from './components/Salary';
import SalEdit from './components/SalaryEdit';
import axios from 'axios';
import SalaryCreate from './components/SalaryCreate';
import PayTax from './components/PayTax';
import ViewReceipt from './components/ViewReceipt';
import Search from './components/Search';
import TaxPayers from './components/TaxPayers';
import Terms from './components/Terms';
import CalculateTerm from './components/CalculateTerm';
import SliderTerms from './components/SliderTerms';

function App() {

  var token= localStorage.getItem('token')
  if(token){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/login"  element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/dashboard" element={<Dashboard />} ></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/calculate/:id" element={<CalculateTax />}></Route>
        <Route path='/admin' element={<AdminPage/>}></Route>
        <Route path='/admin/employee' element={<EmpListing />}></Route>
        <Route path='/admin/employee/detail/:id' element={<EmpDetail />}></Route>
        <Route path='/admin/employee/post' element={<EmpCreate />}></Route>
        <Route path='/admin/employee/edit/:id' element={<EmpEdit />}></Route>
        <Route path='/admin/salary' element={<SalListing />}></Route>
        <Route path='/admin/salary/edit/:id2' element={<SalEdit />}></Route>
        <Route path='/admin/salary/post' element={<SalaryCreate />}></Route>
        <Route path='/payTax' element={<PayTax />}></Route>
        <Route path='/viewReceipt/:id' element={<ViewReceipt />}></Route>
        <Route path='/admin/search' element={<Search />}></Route>
        <Route path='/admin/taxPayers' element={<TaxPayers />}></Route>
        <Route path='/admin/terms' element={<Terms />}></Route>
        <Route path="/calculateTerm/:id" element={<CalculateTerm />}></Route>
        <Route path="/SliderTerms/:id" element={<SliderTerms />}></Route>











      </Routes>
    </Router>
  );
}

export default App;
