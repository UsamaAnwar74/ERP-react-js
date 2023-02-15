import React from "react";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";



const ProductForm = ({ toggleForm }, props) => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [location, setLocation] = useState("");
  const [unit, setUnit] = useState("");
  const [type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(false);

  const navigate = useNavigate();


  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    var token = localStorage.getItem("accessToken")

    const config = {
        headers: {
         contentType : "multipart/form-data",
         Authorization : "Bearer " +  token
     }
      }

      const formData = new FormData();
      formData.append('myFile', selectedFile);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('amount', amount);
      formData.append('location', location);
      formData.append('unit', unit);
      formData.append('type', type);

  axios.post(`https://gtexterp.herokuapp.com/api/product/create`, formData, config)
  .then (response => {
    console.log(response);
    setIsLoading(false);
    toast.success("Product created  successfully!");
      window.location.reload();
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
          <h5>New Property</h5>
          <h4
            onClick={() => {
              toggleForm();
            }}
          >
            X
          </h4>
        </div>
        <div className="justify-content-center align-items-center">
        <form className="w-100 product-form" onSubmit={handleSubmit}  enctype="multipart/form-data">
          <div style={{ margin: "40px" }} className="employee-form-container1">
            <div className="employee-form-input1">
              <label htmlFor="first-name"> Name </label>
              <input
                className="input-field form-control"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              <label htmlFor="first-name">Amount </label>
              <input
                className="input-field form-control"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="employee-form-input">
              <label htmlFor="first-name">Location </label>
              <input
                className="input-field form-control"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="employee-form-input">
              <label htmlFor="first-name">Unit </label>
              <input
                className="input-field form-control"
                type="number"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </div>

          
            <div className="employee-form-input">
              <label htmlFor="first-name">Property Image </label>
              <input
                className="input-field form-control"
                type="file"
                onChange={onFileChange}
              />
            </div>



            <div className="employee-form-input">

              <div>Type</div>
              <select
                style={{}}
                className="input-field form-control"
                // value={props.departments}
                onChange={(e) => {
                    setType(e.target.value);
                }}
              >
                <option>Choose option</option>
                <option>
                    Land
                </option>
                        <option>Gvest</option>
                        <option>House</option>
                        <option>Book</option>
                        <option>Course</option>
                        <option>Event</option>
                    
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

export default ProductForm;
