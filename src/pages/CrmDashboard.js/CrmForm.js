import React from "react";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import "../../index.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




const CrmForm = ({ toggleForm }, props) => {
  
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());


  const [fullName, setFullname] = useState("");
  
  const [email, setEmail] = useState("");
  
  const [phone, setPhone] = useState("");

  const [location, setLocation] = useState([]);

  const [budget, setBudget] = useState("")
  
  const [paymentType, setPaymentType] = useState("");
  
  const [product, setProduct] = useState("");
  
  const [salesAgent, setSalesAgent] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
 
  const [products, setProducts ] = useState([]);
  
  const [productId, setProductId] = useState("");


  const navigate = useNavigate();
  const department = localStorage.getItem('department');
  console.log(department, "yyyyyyyyyyyyyyyyyyy");

  const agentId = localStorage.getItem("_id")


 


  useEffect(() => {
    setIsLoading(true)
    var token = localStorage.getItem("accessToken")
    console.log(token)
    if(!token) {
      navigate("/login");
    }
  
    const headers = {
        contentType : "application/json",
        Authorization : "Bearer " +  token
    }

    const department = localStorage.getItem('department');
    console.log('department', department)
    
    axios.get(`https://gtexterp.herokuapp.com/api/product/get`, {
        headers : headers
    })
      .then(response => {
        setIsLoading(false);
          console.log(response.data.data, "yess")
          let productData = response.data.data
          setProducts([...productData]);

  
            }) 
            .catch(err=> {
                console.error(err)
            })
    }, [])


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    var token = localStorage.getItem("accessToken")
    var organization = localStorage.getItem("organization")

    const config = {
        headers: {
         contentType : "application/json",
         Authorization : "Bearer " +  token
     }
    }

  const data = {
    fullname : fullName,
    email : email,
    phone : phone,
    location : location,
    budget : budget,
    payment_type : paymentType,
    product : productId,
    sales_agent : agentId,
  } 

  axios.post("https://gtexterp.herokuapp.com/api/lead/create", data, config)
  .then (response => {
    console.log(response);
    setIsLoading(false);
      localStorage.setItem("departmentId", response.data.data._id);
      toast.success("Task created  successfully!");
      window.location.reload(); 
      // navigate(-1);
  
  })
  .catch(err => {
    setIsLoading(false);
      console.error(err.response);
      toast.error(err.response.data.message);
  })

  

  };

  return (
    <div className="taskForm">
      <div className="employeeForm">
        <div className="top-title">
          <h5>Update Lead</h5>
          <h4
            onClick={() => {
              toggleForm();
            }}
          >
            X
          </h4>
        </div>
        <div className="justify-content-center align-items-center">
        <form className="w-100" onSubmit={handleSubmit}>
          <div style={{ margin: "40px" }} className="employee-form-container3">
            <div className="employee-form-input">
              <label htmlFor="first-name">Location</label>
              <input
                className="input-field form-control"
                type="text"
                value={fullName}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="first-name"> Interested property type:</label>
              <input
                className="input-field form-control"
                type="Text"
                // value=}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="employee-form-input">
              <label htmlFor="first-name">Date</label>
              <DatePicker  className="input-field form-control" selected={date} onChange={date => setDate(date)} />

              {/* <DatePicker
             selected={startDate}
              onChange={date => setStartDate(date)}
              selectsStart // tells this DatePicker that it is part of a range*
              startDate={startDate}
                 /> */}
            </div>

            <div className="employee-form-input">
              <label htmlFor="first-name">Add Note </label>
              <input
                className="input-field form-control"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>           
          </div>
          <div className="employee-form-container-button">
          <button type="submit">SAVE</button>
            {/* {isLoading === true ? <LoadingSpinner />: 
              <button type="submit">SAVE</button>
            } */}
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default CrmForm;
