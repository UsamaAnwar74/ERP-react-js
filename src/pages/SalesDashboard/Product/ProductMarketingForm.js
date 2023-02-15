import React from "react";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const ProductMarketingForm = ({toggleForm}) => {

    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null)

    const onFileChange = (e) => {
      setFile(e.target.files[0])
    }
  
    let  prodId  = useParams();
    const navigate = useNavigate();

    const handleUpload = (e) => {
      const file = e.target.file;
      setFile(file);
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
        formData.append('myFile', file);
        formData.append('title', title);
  
    axios.post(`https://gtexterp.herokuapp.com/api/marketing/create?id=${prodId.prodId}`, formData, config)
    .then (response => {
      console.log(response);
      setIsLoading(false);
        // window.location.reload(); 
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
            <h5>Update Product</h5>
            <h4
              onClick={() => {
                toggleForm();
              }}
            >
              X
            </h4>
          </div>
          <div className="justify-content-center align-items-center">
          <form className="w-100 product-form" onSubmit={handleSubmit} enctype="multipart/form-data"> 
            <div style={{ margin: "40px" }} className="employee-form-container1">
              <div className="employee-form-input1">
                <label htmlFor="first-name"> Name </label>
                <input
                  className="input-field form-control"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="employee-form-input">
              <label htmlFor="first-name">File</label>
              <input
                className="input-field form-control"
                type="file"
                onChange={onFileChange}
              />
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
)}

export default ProductMarketingForm