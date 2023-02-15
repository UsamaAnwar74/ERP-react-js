import React from "react";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";



const UpdateLead = ({ toggleForm2 }, data)  => {

    const details = data.data ? data.data.data  : {};
    // const Details = data;

    const [isLoading, setIsLoading] = useState(false);
    const[location, setLocation] = useState('');
    const[intrest, setIntrest] = useState('');
    const[note, setnote] = useState('');



  const [fullName, setFullname] = useState("");
  
  const [email, setEmail] = useState("");
  
  const [phone, setPhone] = useState("");


  const [budget, setBudget] = useState("")
  
  const [paymentType, setPaymentType] = useState("");
  
  const [product, setProduct] = useState("");
  
  const [salesAgent, setSalesAgent] = useState("");
  
 
  const [products, setProducts ] = useState([]);
  
  const [productId, setProductId] = useState("");


  const navigate = useNavigate();
  

  const handleSubmit = (event) => {

    console.log("DATA:", data);
    event.preventDefault();
    
    const Leaddata = {
        location: location,
        intrest: intrest,
        note: note,
      };

      console.log(Leaddata);

  
      var token = localStorage.getItem("accessToken");
  
      const config = {
        headers: {
          contentType: "application/json",
          Authorization: "Bearer " + token,
        },
      };
  
      axios.post(
          "https://gtexterp.herokuapp.com/api/leads/update?id="+details._id,
          Leaddata,
          config
        ).then((response) => {
          console.log(response);
          console.log(response.data.user, "nigga raw");
          console.log("12345");
          toast.success("Staff Education created successfully")
          alert("Staff created successfully ");
          navigate(-1);
        }).catch((err) => {
          console.error(err.response);
          toast.error(err.response.data.message);
          //setErrorMsg(err.data.message)
        });
 }

  return (
    <div className="taskForm">
      <div className="updateForm">
        <div className="top-title"  style={{ marginTop: "10px" }} >
          <h3>Details</h3>
          <br></br>
          
           <h4
            onClick={() => {
              toggleForm2();
            }}
          >
            X
          </h4>

          
        </div>
        <div className="justify-content-center align-items-center">
        <h5>Fullname : <strong>{details.fullname? details.fullname : ''}</strong></h5>
          <h5>Email : <strong>{details.email ? details.email: ''}</strong></h5>
          <h5>Phone : <strong>{details.phone ? details.phone : ''}</strong></h5>
          <h5>Location : <strong>{details.location ? details.location: 'not mentioned'}</strong></h5>
          <h5>Sales agent : <strong>{details.sales_agent ? details.sales_agent.first_name+" ("+details.sales_agent.profession+")" : 'not assigned'}</strong></h5>
         

        <form className="w-100" onSubmit={handleSubmit}>
          <div style={{ margin: "0px" }} >
            <div className="employee-form-input1">
              <label htmlFor="first-name">Interested Location:</label>
              <textarea name="location" className="input-field form-control" rows="3" cols="3" 
                    onChange={(event) => { setLocation(event.target.value) }}
                    value={location} >
                </textarea> 
              {/* <input
                className="input-field form-control"
                type="text"
                value={location}
                onChange={(event) =>  setLocation(event.target.value) }
              /> */}
            </div>
            <div className="employee-form-input">
              <label htmlFor="first-name"> Interested property type: </label>

              <textarea name="intrest" className="input-field form-control" rows="3" cols="3" 
                    onChange={(event) => { setIntrest(event.target.value) }}
                    value={intrest} 
                ></textarea> 
              {/* <input
                className="input-field form-control"
                type="intrest"
                value={intrest}
                onChange={(event) =>  setIntrest(event.target.value) }
              /> */}
            </div>

            <div className="employee-form-input">
              <label htmlFor="first-name">Note: </label>

              <textarea name="note" className="input-field form-control" rows="3" cols="3"  
                    onChange={(event) => { setnote(event.target.value) }}
                    value={note} 
                    ></textarea> 
              {/* <input
                className="input-field form-control"
                type="note"
                value={note}
                onChange={(event) => setnote(event.target.value)}
              /> */}
            </div>
          </div>
          
        </form>
        <div>
            <button className="sm-btn">SAVE</button>
            <br></br>
            </div>
            <small>Last update: <strong>{details.updatedAt ? details.updatedAt : ''}</strong> </small>
            
            <hr></hr>
        </div>
      </div>
    </div>
  );
};

export default UpdateLead;
