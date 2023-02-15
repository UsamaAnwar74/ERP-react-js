import React from "react";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";



const Landlordform = ({ toggleForm }, props) => {


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerLocation, setCustomerLocation] = useState([]);
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("")
  const [customerEmail, setCustomerEmail] = useState("");
  const [assignTo, setAssignTo] = useState([]);
  const [type, setType] = useState("");
  const [assignToDepartment, setAssignToDepartment] = useState("");
    const [isLoading, setIsLoading] = useState(false);
 
    const [products, setProducts ] = useState([]);
    const [productId, setProductId] = useState("");


  const navigate = useNavigate();
  const department = localStorage.getItem('department');
  console.log(department, "yyyyyyyyyyyyyyyyyyy");

  const agentId = localStorage.getItem("_id");


 


  useEffect(() => {
    setIsLoading(true)
    var token = localStorage.getItem("accessToken")
    console.log(token)
    if(!token) {
      navigate("/login");
    }

    const config = {
        headers: {
          contentType: "application/json",
          Authorization: "Bearer " + token,
        },
      };
  
    const headers = {
        contentType : "application/json",
        Authorization : "Bearer " +  token
    }

    const department = localStorage.getItem('department');
    console.log('department', department)


    axios
    .get(`https://gtexterp.herokuapp.com/api/staff/by_depaftment?id=${department}`, config)
    .then((response) => {
      setIsLoading(false);
      // console.log(response);
      // console.log("gvcchjewfgfhj", response.data.data);
      // console.log("12345");
      let assignToData = response.data.data;
      setAssignTo([...assignToData]);
      console.log(setAssignTo([...assignToData]));
    })
    .catch((err) => {
      console.error(err.response);
      //setErrorMsg(err.data.message)
    });


    
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
    title : title ,
    description : description,
    customer_name : customerName,
    customer_location : customerLocation,
    customer_phone_number : customerPhoneNumber,
    customer_email : customerEmail,
    assigned_to : assignToDepartment,
    type : type,
  } 

  axios.post("https://gtexterp.herokuapp.com/api/landload/create", data, config)
  .then (response => {
    console.log(response);
    setIsLoading(false);
    //   localStorage.setItem("departmentId", response.data.data._id);
      toast.success("Task created  successfully!");
      window.location.reload(); 
      // navigate(-1);
  
  })
  .catch(err => {
    setIsLoading(false);
      // console.error(err.response);
      // toast.error(err.response.data.message);
    
      
    
  })

  };









  return (
    <div className="taskForm">
      <div className="employeeForm">
        <div className="top-title">
          <h5>New Landlord</h5>
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
          <div style={{ margin: "40px" }} className="employee-form-container1">
            <div className="employee-form-input1">
              <label htmlFor="first-name">Title</label>
              <input
                className="input-field form-control"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="first-name">Description </label>
              <input
                className="input-field form-control"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="employee-form-input">
              <label htmlFor="first-name"> Landlord Name  </label>
              <input
                className="input-field form-control"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>

            <div className="employee-form-input">
              <label htmlFor="first-name"> Landlord Location </label>
              <input
                className="input-field form-control"
                type="text"
                value={customerLocation}
                onChange={(e) => setCustomerLocation(e.target.value)}
              />
            </div>

            <div className="employee-form-input">
              <label htmlFor="first-name">Landlord Phone Number </label>
              <input
                className="input-field form-control"
                type="number"
                value={customerPhoneNumber}
                onChange={(e) => setCustomerPhoneNumber(e.target.value)}
              />
            </div>

            <div className="employee-form-input">
              <label htmlFor="first-name">Landlord Email </label>
              <input
                className="input-field form-control"
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>

            

            <div className="employee-form-input">
              <div> Type</div>
              <select
                style={{}}
                className="input-field form-control"
                // value={props.departments}
                onChange={(e) => {
                    setType(e.target.value);
                }}
              >
                <option>Choose Option</option>
                <option>Inquiry</option>
                        <option>Complaint</option>
                        <option>Request</option>
                    
              </select>
            </div>

            <div className="employee-form-input">
              <div>Assign To</div>
              <select
                style={{}}
                className="input-field form-control"
                // value={props.departments}
                onChange={(e) => {
                  setAssignToDepartment(e.target.value);
                }}
              >
                <option value="default" className="input-field">
                  Assigned To
                </option>
                {assignTo && Array.isArray(assignTo)
                  ? assignTo.map((assignedTo) => {
                      // console.log("department", department);

                      return (
                        <option key={assignedTo._id} value={assignedTo._id}>
                          {assignedTo.first_name} {assignedTo.last_name}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>

            


          
           
          </div>
          <div className="employee-form-container-button">
            {isLoading === true ? <LoadingSpinner /> : 
            <button type="submit">SAVE</button>
          }
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Landlordform;
