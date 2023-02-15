import React from "react";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";



const LeadsForm = ({ toggleForm, departments , LeadsReload } ) => {


  const [fullName, setFullname] = useState("");
  
  const [email, setEmail] = useState("");
  
  const [phone, setPhone] = useState("");

  const [location, setLocation] = useState([]);

  const [budget, setBudget] = useState("")
  
  const [paymentType, setPaymentType] = useState("");
  
  const [product, setProduct] = useState("");

  
  
  const [salesAgent, setSalesAgent] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
 
  const [products, setProducts ] = useState([]);
  
  const [productId, setProductId] = useState("");

  const [DepartmentInfo, setDepartmentInfo] = useState([]);
  const department = localStorage.getItem('department');
  const getdepartmentURL = `https://gtexterp.herokuapp.com/api/staff/by_depaftment?id=${department}`;


  const navigate = useNavigate();
 
  console.log(department, "yyyyyyyyyyyyyyyyyyy");

  const agentId = localStorage.getItem("_id")
  // const getDepartment = () => {
  var token = localStorage.getItem("accessToken");

  const config = {
  headers: {
    contentType: "application/json",
    Authorization: "Bearer " + token,
  },
    };

    axios.get(getdepartmentURL, config).then((response) => {
      console.log(response);
      //console.log("department", response.data.data);
      let departmentData = response.data.data;
      setDepartmentInfo([...departmentData]);
     // console.log(setDepartmentInfo([...departmentData]));
     // console.log(departmentData, "Usamaaa");
    })
    .catch((err) => {
      console.error(err.response);
    });
    
  // }
useEffect(() => {

    
},[]);


  useEffect(() => {
    setIsLoading(true)
    var token = localStorage.getItem("accessToken")
    console.log(token)
    if(!token) {
      navigate("/login");
    }
    var token = localStorage.getItem("accessToken");
    

    const department = localStorage.getItem('department');
    console.log('test', department)
    const headers = {
      contentType : "application/json",
      Authorization : "Bearer " +  token
  } 
    
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
          <h5>New Leads</h5>
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
              <label htmlFor="first-name">Client Full Name</label>
              <input
                className="input-field form-control"
                type="text"
                value={fullName}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="first-name"> Client Email </label>
              <input
                className="input-field form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="employee-form-input">
              <label htmlFor="first-name">Client Phone Numbner  </label>
              <input
                className="input-field form-control"
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="employee-form-input">
              <label htmlFor="first-name"> Client Location </label>
              <input
                className="input-field form-control"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="employee-form-input">
              <label htmlFor="first-name">Budget </label>
              <input
                className="input-field form-control"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>

            <div className="employee-form-input">
              <div>Payment Type</div>
              <select
                style={{}}
                className="input-field form-control"
                // value={props.departments}
                onChange={(e) => {
                  setPaymentType(e.target.value);
                }}
              >
                <option>Select Payment Type</option>
                <option>Installmental Payment</option>
                        <option>Full Payment</option>
              </select>
            </div>

            <div className="employee-form-input">
              <div>Product</div>
              <select
                style={{}}
                className="input-field"
                // value={props.departments}
                onChange={(e) => {
                  setProductId(e.target.value);
                }}
              >
                <option value="default" className="input-field">
                  Choose Product
                </option>
                {products && Array.isArray(products)
                  ? products.map((product) => {
                     //  console.log("products", products);

                      return (
                        <option key={product._id} value={product._id}>
                          {product.name}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>

            <div className="employee-form-input">
              <div>Sales Agent</div>
              
              <select
                        style={{}}
                        className="input-field"
                        // value={props.departments}
                        onChange={(e) => {
                          setDepartmentInfo(e.target.value);
                  
                        }}
                    >
                        <option value="default" className="input-field">
                        Select Agent
                        </option>
                        {DepartmentInfo && Array.isArray(DepartmentInfo)
                        ? DepartmentInfo.map((department) => {
                          //console.log("Hi", salesAgent);

                            return (
                                <option key={department._id} value={department._id}>
                                {department.first_name}
                                
                                </option>
                            );
                            })
                        : null}
                    </select>
            </div>
          </div>
          <div className="employee-form-container-button">
            {isLoading === true ? <LoadingSpinner />: 
              <button type="submit">SAVE</button>
            }
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default LeadsForm;
