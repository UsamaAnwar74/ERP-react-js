import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import SearchIcon from "../../../images/search.png";
import RecruitmentForm from "./RecruitmentForm";

const Applications = () => {
  const [activeClass, setActiveClass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [applications, setApplications] = useState([]);


  const navigate = useNavigate();
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
    
    axios.get("https://gtexterp.herokuapp.com/api/application/all", {
        headers : headers
    })
        .then(response => {
          setIsLoading(false);
            console.log(response.data.data)
            let applicationData = response.data.data;
            applicationData = applicationData.sort().reverse();
            setApplications([...applicationData]);
            // let objectData = response.data.data;
            // objectData = objectData.sort().reverse();

      let tableData;

              }) 
              .catch(err=> {
                  console.error(err)
              })
      }, [])



      const resumeHandler = (applicationInfo) => {
        window.location.href = applicationInfo.resume
      }




  return (
    <>
      <div className="d-flex justify-content-between">
     
        <div className="search-input ">
          <input placeholder="Search Employee" />
          <img src={SearchIcon} alt="" />
        </div>

        <button onClick={() => navigate(-1)} className="sm-btn">
          Back
        </button>
      </div>
      <div className="mt-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Job Title</th>
              <th>Location</th>
              <th>Phone Number</th>
              <th>Notice Period</th>
              <th>Resume</th>
              <th>Updated At </th>
            </tr>
          </thead>
          {isLoading && <div><LoadingSpinner /></div>}
          <tbody>
          {applications.map(( applicationInfo, applicationInfoIndex) => (
            <tr key={applicationInfo._id} value={applicationInfo.id}>
              <td>{applicationInfo.first_name}</td>
              <td>{applicationInfo.last_name}</td>
              <td>{applicationInfo.job_title}</td>
              <td>{applicationInfo.location}</td>
              <td>{applicationInfo.phone}</td>
              <td>{applicationInfo.notice_period}</td>
              <td><button onClick={() => resumeHandler(applicationInfo)} className="sm-btn" >View Resume</button> </td>
              <td>{moment(applicationInfo.updatedAt).format('LLLL')}</td>
            </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Applications;
