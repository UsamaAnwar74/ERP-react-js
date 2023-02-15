import React from "react";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";



const RecruitmentForm = ({ toggleForm }, props) => {
    const [activeClass, setActiveClass] = useState(false);


  const [departmentName, setDepartmentName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const [isLoading, setIsLoading] = useState(false);const [user, setUser] = useState({
    name: "",
    organization: "",
  })

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

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    setIsLoading(true);
    // auth.login(email);
    e.preventDefault();
    var token = localStorage.getItem("accessToken")
    var organization = localStorage.getItem("organization")

    const config = {
        headers: {
         contentType : "application/json",
         Authorization : "Bearer " +  token
     }
      }

  const data = {
    job_title : jobTitle ,
    description : description,
    location : location,
  } 

  axios.post("https://gtexterp.herokuapp.com/api/job/create", data, config)
  .then (response => {
    setIsLoading(false);
    toast.success("Job created  successfully");
    window.location.reload () 
    //   navigate(-1);
  
  })
  .catch(err => {
      console.error(err.response);
      toast.error(err.response.data.message);
    
      
      //setErrorMsg(err.data.message)
  })

  };


  async function editHandler(jobId, event) {
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
      .put(`https://gtexterp.herokuapp.com/api/job/update?id=${jobId}`, user, config)
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
    const result = await axios.get(`https://gtexterp.herokuapp.com/api/job/update?id=${jobId}`, config )
    console.log("yes lord",result.data.data);

    setUser(result.data.data);
  }



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
              <label htmlFor="first-name">Title</label>
              <input
                className="input-field form-control"
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
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
              <label htmlFor="first-name"> Location </label>
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
    </div>
  );
};

export default RecruitmentForm;
