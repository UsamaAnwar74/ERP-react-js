import React from "react";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../index.css';
import { toast } from "react-toastify";



const ExpensesForm = ({ toggleForm }, props) => {


  const [departmentName, setDepartmentName] = useState("");

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    // auth.login(email);
    e.preventDefault();
    var token = localStorage.getItem("accessToken")
    var organization = localStorage.getItem("organization")

    const config = {
        headers: {
         contentType : "application/json",
         Authorization : "Bearer " +  token
     }
      }

  const data = {
    name : departmentName ,
    organization : organization
  } 

  axios.post("https://gtexterp.herokuapp.com/api/department/create", data, config)
  .then (response => {
    console.log('ghvgghjuyhyubhubbhb');
    console.log(response);
      console.log(response.data.data._id);
      localStorage.setItem("departmentId", response.data.data._id);
      toast.success("Department created successfully!");
      alert('Department created successfully');
      navigate(-1);
  
  })
  .catch(err => {
      console.error(err.response);
      toast.error(err.response.data.message);
    
      
      //setErrorMsg(err.data.message)
  })

  };



  return (
    <div>
      <div className="employeeForm">
        <div className="top-title">
          <h5>New Employee</h5>
          <h4
            onClick={() => {
              toggleForm();
            }}
          >
            X
          </h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <img src="" className="" />
          </div>
          <div className="employee-form-container">
            <div className="employee-form-input">
              <label htmlFor="first-name">Department Name</label>
              <input className="input-field" type="text" onChange={(e) => {setDepartmentName(e.target.value)}} />
            </div>
            {/* <div className="employee-form-input">
              <label htmlFor="first-name">Middle Name</label>
              <input className="input-field" type="text" />
            </div> */}
            
          </div>
          <div className="employee-form-container-button">
            <button type="submit">SAVE</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpensesForm;
