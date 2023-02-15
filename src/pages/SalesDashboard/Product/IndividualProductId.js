import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {BsTrash} from "react-icons/bs"
// import LoadingSpinner from "/../../components/LoadingSpinner/LoadingSpinner";

import TopNav from "../../../components/TopNav";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ProductUpdateForm from "./ProductUpdateForm";
import ProductMarketingForm from "./ProductMarketingForm";

const IndividualProductId = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [individualProductInfo, setIndividualProductInfo] = useState(null);
    const [activeClassEdit, setActiveClassEdit] = useState(false);
    const [activeClassMarketing, setActiveClassMarketing] = useState(false);
    
    const toggleForm1 = () => {
      setActiveClassEdit(!activeClassEdit);
    };

    const navigate = useNavigate();    
    let  prodId  = useParams();


    const toggleForm2 = () => {
      setActiveClassMarketing(!activeClassMarketing);
    };

    const onDelete = () => {
        setIsDeleteLoading(true);
        var token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/login");
        }
        const headers = {
            contentType: "application/json",
            Authorization: "Bearer " + token, 
          };

        axios.get(`https://gtexterp.herokuapp.com/api/product/delete?id=${prodId.prodId}`, {
            headers: headers
          })
          .then((response) => {
            setIsDeleteLoading(false);
            navigate(-1)
          })
    }
         

    useEffect(() => {
        setIsLoading(true);
        var token = localStorage.getItem("accessToken");
        console.log(token);
        if (!token) {
          navigate("/login");
        }
    

        const headers = {
          contentType: "application/json",
          Authorization: "Bearer " + token,
        };
        console.log("PROD",prodId.prodId);

        axios.get(`https://gtexterp.herokuapp.com/api/product/one?id=${prodId.prodId}`, {
            headers: headers,
          })
          .then((response) => {
            setIsLoading(false);
            let producttData = response.data.data;
            setIndividualProductInfo(producttData);
          })
          .catch((err) => {
            setIsLoading(false);
            console.error(err);
          });
      }, [navigate, prodId]);

    return (
        <div>
            <TopNav />
            <div className="container-fluid p-5">
                <div className="d-flex justify-content-end ps-4 pe-4">
                    <button onClick={onDelete} className="sm-btn property-top-btn">
                        {isDeleteLoading ? 
                        'deleting...'
                        :
                        <BsTrash/> }
                    </button>
                    
                    <button onClick={() => navigate(-1)} className="sm-btn property-btn">
                        Back
                    </button>
                </div>
                {individualProductInfo ? <div className="one-product"> 
                    <h6>{individualProductInfo.name}</h6>
                    <div className="single-property">
                      <div className="single-image">
                        <img alt="" src={individualProductInfo.picture}/>
                    <div className="single-property-details">
                    <button className="sm-btn property-btn" onClick={toggleForm1}>Edit this page</button>
                      <div className="each-property-detail">
                        <span>Description:</span>
                        <p>{individualProductInfo.description}</p> 
                      </div>
                      <div className="each-property-detail">
                        <span>Location:</span>
                        <p>{individualProductInfo.location}</p>
                      </div>
                      <div className="each-property-detail">
                        <span>Unit:</span>
                        <p>{individualProductInfo.unit}</p>
                      </div>
                      <div className="each-property-detail">
                        <span>Type:</span>
                        <p>{individualProductInfo.type}</p>
                      </div>
                      <div className="each-property-detail">
                        <span>Amount</span>
                        <p>{individualProductInfo.amount}</p>
                      </div>
                    </div>
                      </div>
                    </div>
                    <div className="linebreak"></div>
                    <hr />
                    
                    <hr />

                    <div className={`employeeform-container ${activeClassEdit ? "show" : ""}`}>
                        <div
                        onClick={toggleForm1}
                        className={`employeeform-overlay ${activeClassEdit ? "show" : ""}`}
                        ></div>
                        <div className={"employee-form"}>
                            
                            <ProductUpdateForm individualProductInfo={individualProductInfo} toggleForm={toggleForm1}
                            />
                        </div>
                    </div>

                    <div className="marketing-materials">
                        <h6>Marketing Materials</h6>
                        <button onClick={toggleForm2} className="sm-btn property-btn">Add marketing materials</button>

                        <div className={`employeeform-container ${activeClassMarketing ? "show" : ""}`}>
                        <div
                        onClick={toggleForm2}
                        className={`employeeform-overlay ${activeClassMarketing ? "show" : ""}`}
                        ></div>
                        <div className={"employee-form"}>
                            
                            <ProductMarketingForm toggleForm={toggleForm2}
                            />
                        </div>
                    </div>


                        <div className="marketing-marterials-box">
                            {individualProductInfo && individualProductInfo.marketings.map(marketing => {
                              return (
                                <div className="box">
                                  <h5>{marketing.title}</h5>
                                  <span onClick={() => window.open(marketing.image, '_blank')}>View</span>
                                </div>
                              )
                            })}
                        </div>
                    </div>
                    
                </div>
                :
                <LoadingSpinner/>}
            </div>
        </div>
    );
};

export default IndividualProductId;
