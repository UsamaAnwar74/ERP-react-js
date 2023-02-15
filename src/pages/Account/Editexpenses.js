import React from "react";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../index.css';
import { toast } from "react-toastify";



const EditExpensesForm = ({ toggleForm }, props) => {


  const [departmentName, setDepartmentName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    organization: "",
  })

  const navigate = useNavigate();
  
  const { name, organization } = user;

  var token = localStorage.getItem("accessToken");
 
  const config = {
    headers: {
      contentType: "application/json",
      Authorization: "Bearer " + token,
    },
  };
 
  useEffect(() => {
     loadUser();
  }, []);
 
   async function EditButtonHandler(event) {
     event.preventDefault();
     setIsLoading(true);
 
     var organization = localStorage.getItem("organization");
 
 
 
     var token = localStorage.getItem("accessToken");
 
     const config = {
       headers: {
         contentType: "application/json",
         Authorization: "Bearer " + token,
       },
     };
 
     axios
       .put(`https://gtexterp.herokuapp.com/api/staff/update?id=`, user, config)
       .then((response) => {
         console.log(response)
         setIsLoading(false);
         
       
         toast.success('staff details has been updated');
         // alert("Staff created successfully ");
         navigate(-1);
       })
       .catch((err) => {
         console.error(err.response);
         toast.error(err.response.data.message);
         setIsLoading(false);
         console.log(err.response.data.message);
         //setErrorMsg(err.data.message)
       });
 
     // }
   }
 
 
   const loadUser = async() => {
     const result = await axios.get(`https://gtexterp.herokuapp.com/api/staff/one?id=`, config )
     console.log("yes lord",result.data.data);
 
     setUser(result.data.data);
   }



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
        <form onSubmit={EditButtonHandler}>
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

export default EditExpensesForm;
