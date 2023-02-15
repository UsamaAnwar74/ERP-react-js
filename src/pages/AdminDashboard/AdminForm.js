import React from "react";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";



const AdminForm = ({ toggleForm }, props) => {


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
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
    title : title ,
    description : description,
    type : type,
  } 

  axios.post("https://gtexterp.herokuapp.com/api/admin/create", data, config)
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
          <h5>New Issues</h5>
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
              <label htmlFor="first-name"> Description </label>
              <input
                className="input-field form-control"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
           
            <div className="employee-form-input">
              <div>Payment Type</div>
              <td>
              <select
                style={{}}
                className="input-field form-control"
                // value={props.departments}
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                
                <option>Choose Type</option>
                {/* <option value="default" className="input-field">
                      
                </option> */}
                <option>Repair</option>

                        <option>New Item</option>
                    
              </select>
              </td> 
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

export default AdminForm;
