  import React from "react";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import Recruitment from "./Recruitment";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";



const RecruitmentTabsId = ({ toggleForm }, props) => {
    const [activeClass, setActiveClass] = useState(false);
    const [jobTitle, setJobTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");

  const [departmentName, setDepartmentName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    job_title: "",
    description: "",
    location: "",
  })

  const navigate = useNavigate();

  const recId = useParams();
  console.log(recId.recruitmentTabs, "recId");
  
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
 
  async function EditButtonHandler(jobId, event) {
    setActiveClass(!activeClass);
    // event.preventDefault();
   
   
    setIsLoading(true); 

    jobId = localStorage.getItem("jobId")

    var organization = localStorage.getItem("organization");



    var token = localStorage.getItem("accessToken");

    const config = {
      headers: {
        contentType: "application/json",
        Authorization: "Bearer " + token,
      },
    };

    axios
      .put(`https://gtexterp.herokuapp.com/api/job/update?id=${recId.recruitmentTabs}`, user, config)
      .then((response) => {
        console.log(response)
        setIsLoading(false);
        
        
        console.log(response.data, "the money is nigeria");
      
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


  // async function editHandler(id){
  //   setActiveClass(!activeClass);
    
  // }

  let jobId = localStorage.getItem("jobId");

  const loadUser = async() => {
    const result = await axios.get(`https://gtexterp.herokuapp.com/api/job/update?id=${recId.recruitmentTabs}`, config )
    console.log("yes lord",result.data.data);

    setUser(result.data.data);
  }
  return (
    <div>
      <div className="employeeForm">
        <div className="top-title">
          <h5>New Employee</h5>
          <button onClick={() => navigate(-1)} className="sm-btn">
          Back
        </button>
        </div>
        <form onSubmit={EditButtonHandler}>
        <div style={{ margin: "40px" }} className="employee-form-container1">
            <div className="employee-form-input1">
              <label htmlFor="first-name">Job Title</label>
              <input
                className="input-field form-control"
                type="text"
                value={jobTitle}
                onChange={(e) => setUser({ ...user, [e.target.job_title]: e.target.value })}
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
              <label htmlFor="first-name"> Location   </label>
              <input
                className="input-field form-control"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
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
  );
};

export default RecruitmentTabsId;
