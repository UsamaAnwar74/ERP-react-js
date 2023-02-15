import React, { useState, useEffect } from "react";
import axios from "axios";
import {  useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import EducationForm from "./EducationForm";
import moment from "moment";

const EmployeeInfo = (props) => {
const [ userDetails  ,setUserDetails] = useState({});
const [schoolDetails, setSchoolDetails] = useState([])
const [activeClass, setActiveClass] = useState(false);
const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);


  const params = useParams();
  console.log(  "yet",params.userid, "yet");

  useEffect(() => {
    setIsLoading(true)
    var token = localStorage.getItem("accessToken")
   
  
  
    const headers = {
        contentType : "application/json",
        Authorization : "Bearer " +  token
    }
    
    axios.get(`https://gtexterp.herokuapp.com/api/profile/get?id=${params.userid} `, {
        headers : headers
    })
        .then(response => {
          // if(response.data != true){
          //   alert("no data found")
          //   throw Error('Could not fetch the data for that resource');
          // }
          setIsLoading(false)
            console.log(response.data.data)
            let userInfo = response.data.data
            setUserDetails(userInfo);
            console.log( setUserDetails(userInfo), "nene");
            
           let email = response.data.data.email;
          let  phone =  response.data.data.phone;
          let first_name = response.data.data.first_name;
          //  position = response.data.data.position;
          //  _id =  response.data.data._id;
           console.log("phone", phone, email);
           
            setErrorMessage(null);
              }) 
              .catch(err=> {
                setIsLoading(false)
                setErrorMessage(err.message)
                  console.error(err)
              })
      }, [ ])
 
      const toggleForm = () => {
        setActiveClass(!activeClass);
      };


      useEffect(() => {
        setIsLoading(true)
        var token = localStorage.getItem("accessToken")
       
      
      
        const headers = {
            contentType : "application/json",
            Authorization : "Bearer " +  token
        }
        
        axios.get(`https://gtexterp.herokuapp.com/api/staff/getInstitution?id=${params.userid}`, {
            headers : headers
        })
            .then(response => {
              // if(response.data != true){
              //   alert("no data found")
              //   throw Error('Could not fetch the data for that resource');
              // }
              setIsLoading(false)
                console.log(response.data.data)
                let schoolInfo = response.data.data
                setSchoolDetails([...schoolInfo]);
                console.log( setSchoolDetails([...schoolInfo]), "loveth");
                setErrorMessage(null);
               
      
          
      
      
                  }) 
                  .catch(err=> {
                    setIsLoading(false)
                    setErrorMessage(err.message)
                      console.error(err)
                  })
          }, [ ])



  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Personal Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>First Name</td>
            <td>{userDetails.first_name}</td>
            <td>Home Address</td>
            <td>{userDetails.house_number}{userDetails.house_address}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>{userDetails.last_name}</td>
            <td>City</td>
            <td>{userDetails.city}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{userDetails.email}</td>
            <td>State</td>
            <td>{userDetails.state}</td>
          </tr>
          <tr>
            <td>Mobile</td>
            <td>{userDetails.phone}</td>
            <td>Country</td>
            <td>{userDetails.country}</td>
          </tr>
          <tr>
            <td>Date of Birth</td>
            <td>{moment(userDetails.date_birth).format('LLLL')}</td>
            <td>Nationality</td>
            <td>{userDetails.country}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{userDetails.gender}</td>
            <td>Nigerian</td>
            <td>Singing. Cooking. Sleeping</td>
          </tr>
          <tr>
            <td>Marital Status</td>
            <td>{userDetails.marital_status}</td>
          </tr>
        </tbody>
      </Table>
      <Table>
        <thead>
          <tr>
            <th>Work</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Department</td>
            <td> {userDetails.department ? userDetails.department.name : null} </td>
            <td>Hire Date</td>
            <td>10/10/2022</td>
          </tr>
          <tr>
            <td>Job Title</td>
            <td>{userDetails.profession}</td>
            <td>Employment Type</td>
            <td>Full Time</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{userDetails.email}</td>
            <td>State</td>
            <td>{userDetails.state}</td>
          </tr>
          <tr>
            <td>Mobile</td>
            <td>{userDetails.phone}</td>
            <td>Country</td>
            <td>{userDetails.country}</td>
          </tr>
          <tr>
            <td>Work Email</td>
            <td>{userDetails.email}</td>
            <td>Employment Status</td>
            <td>Active</td>
          </tr>
          <tr>
            <td>Work Mobile</td>
            <td>{userDetails.phone}</td>
            <td>Reporting To</td>
            <td>Mr. Daniel Rice</td>
          </tr>
        </tbody>
      </Table>
      {/* <Table>
        <thead>
          <tr>
            <th>School Name</th>
            <th>Degree</th>
            <th>Field of Study</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>University of Ibadan</td>
            <td>Bachelor of Science</td>
            <td>Science</td>
            <td>12/05/2021</td>
            <td>30/07/2022</td>
          </tr>
          <tr>
            <td>University of Ibadan</td>
            <td>Bachelor of Science</td>
            <td>Science</td>
            <td>12/05/2021</td>
            <td>30/07/2022</td>
          </tr>
        </tbody>
        <button className="sm-btn">Add Work Experience</button>
      </Table> */}
      <Table>
        <thead>
          <tr>
            <th>School Name</th>
            <th>Degree</th>
            <th>Location</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
        {schoolDetails.map((schoolDetail, schoolDetailIndex) => (
             <tr>
             <td>{schoolDetail.name}</td>
             <td>{schoolDetail.course}</td>
             <td>{schoolDetail.location}</td>
             <td>{moment(schoolDetail.start_date).format('LLLL')}</td>
             <td>{moment(schoolDetail.end_date).format('LLLL')}</td>
           </tr>
        ))}
        </tbody>
      </Table>
      <button className="sm-btn" onClick={toggleForm}>Add Education</button>
      <div className={`employeeform-container ${activeClass ? "show" : ""}`}>
        <div
          onClick={toggleForm}
          className={`employeeform-overlay ${activeClass ? "show" : ""}`}
        ></div>
        <div className={"employee-form"}>
          <EducationForm toggleForm={toggleForm}
           />
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfo;
