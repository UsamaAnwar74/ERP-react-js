import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import moment from "moment";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import ProductForm from "./ProductForm";
import "../../../index.css"





const Product = () => {
    const [isLoading, setIsLoading] = useState(false);
    // const [taskInfos, setTaskInfos] = useState({});
    const [allProducts, setAllProducts] = useState([]);
    // const [allDepartmentTask, setAllDepartmentTask] = useState([]);
    // const [individualDepartmentTask, setIndividualDepartmentTask] = useState([]);
    const [activeClass, setActiveClass] = useState(false);
    // const [activeClass2, setActiveClass2] = useState(false);
    const [user, setUser] = useState({
      status: "",
    });

    // const [selectValue, setValue] = useState("");

    const navigate = useNavigate();

    const paramsId = useParams();
    console.log("paramid", paramsId.staffId);

    const userid = localStorage.getItem('_id');
    const department = localStorage.getItem('department');
    console.log(userid, " userid d rock");
    console.log(department, "d boss ");


    const isHOD = localStorage.getItem("isHOD");
    var token = localStorage.getItem("accessToken");

    const { status } = user;

    const config = {
      headers: {
        contentType: "application/json",
        Authorization: "Bearer " + token,
      },
    };
   
   


    const toggleForm = () => {
      setActiveClass(!activeClass);
    };
       

         

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
                setAllProducts([...productData]);
      
       
                  }) 
                  .catch(err=> {
                      console.error(err)
                  })
          }, [])


      

    

return (
<div className="container-fluid p-5">
  <div className="ps-4 pe-4">

  <button className="pull-left sm-btn" onClick={toggleForm}>Create a new Property</button>

    <button onClick={() => navigate(-1)} className="sm-btn pull-right">
      Back
    </button>

  </div>

<div className="property-list">
      <div className={`employeeform-container ${activeClass ? "show" : ""}`}>
        <div
          onClick={toggleForm}
          className={`employeeform-overlay ${activeClass ? "show" : ""}`}
        ></div>
        <div className={"employee-form"}>
          <ProductForm toggleForm={toggleForm}
           />
        </div>
      </div>


 


      <div className="row">
      {isLoading === true && <div><LoadingSpinner /></div>}
      {allProducts.map((allProductInfo, allProductInfoIndex) => (
          <div key={allProductInfo._id} value={allProductInfo.id} className="col-md-3">
          <div className="box">
          <Link
                  to={`/sales/product/${allProductInfo._id}`}
                  key={allProductInfoIndex}
                  state={allProductInfo}
                  className="property-thumbnail"
                  style={{
                    textDecoration: "none",
                    width: "70px",
                    height: "70px",
                  }}
                >
                 <img alt="" src={allProductInfo.picture}/>
                 <h4>{allProductInfo.name}</h4> 
              </Link>
            {/* <p>{allProductInfo.description}</p> */}
            <p className="price">Starting price: <strong> AED {allProductInfo.amount}</strong> </p>
            <p className="location">Location: {allProductInfo.location}</p>
            <p className="units">No of units: {allProductInfo.unit}</p>
            {/* <h4>{allProductInfo.type}</h4> */}
          </div>       
        </div>
      ))}
      </div>
    </div>
  </div>
)
}

export default Product;
