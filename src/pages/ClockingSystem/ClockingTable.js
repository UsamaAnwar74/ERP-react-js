import React, { useState, useEffect, } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import GeoLocation from "../../components/Geolocation";
import TopNav from "../../components/TopNav";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import { Table } from "react-bootstrap";
import Geocode from "react-geocode";
import moment from 'moment';

const ClockingTable = () => {
  const navigate = useNavigate();
  const [guest, setUserType] = useState( false);
  const [fullName, setFulName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [purposeOfVisit, setPurposeOfVisit] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const  [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const current = new Date();
  const [time, setTime] = useState(current.toLocaleTimeString("en-US"));  

  const [employeeInfos, setEmployeeInfos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentLocation, setCurrentLocation] = useState({});
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0)

  const [clockinData, setClockinData] = useState([])
  
  Geocode.setApiKey("AIzaSyDsb7F-VyBJn7r4LilYH_lRHBpPfgyUga8");
  Geocode.enableDebug();

  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const currentTime = () => {
    let time = new Date().toLocaleTimeString("en-US");
    setTime(time);
  };
  
  setInterval(currentTime, 1000);

  let locator = GeoLocation();

  const handleUserType = (e) => {
    setUserType(!guest);
    setType(e.target.value)
  };

  useEffect(() => {
    setIsLoading(true)
    //getLocation()
    var token = localStorage.getItem("accessToken")
    console.log(token)
    if(!token) {
      navigate("/login");
    }
    const headers = {
      contentType : "application/json",
      Authorization : "Bearer " +  token
    }

    
    axios
      .get("https://gtexterp.herokuapp.com/api/clockin/all", {
        headers: headers,
      })
      .then((response) => {
        if (!response) {
          throw Error("Could not fetch the data for that resource");
        }
        setIsLoading(false);
        console.log("response",response.data.data);
        let employeeData = response.data.data;
        employeeData = employeeData.sort().reverse();
        setEmployeeInfos([...employeeData]);
        let objectData = response.data.data;
        console.log("objectData", objectData)
        objectData = objectData.sort().reverse;

        let tableData;
        employeeInfos.map((value, index) => {
          console.log(value.first_name);
          tableData += `
          
           <tr key=${index} value=${value.id}>
         
        <td>1</td>
        <td>${value.first_name}</td>
        <td>${value.last_name}</td>
        <td>${value.email}</td>
        <td>${value.gender}</td>
        <td>${value.profession}</td>
      </tr>
  `;
        });
        document.getElementById("table_body").innerHTML = tableData;
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });

      }, [])
      

  const handleSubmit = async (e) => {
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
    "date": date,
    "check_in_time": time,
    "location": location,
    "purpose_of_visit": purposeOfVisit,
    "email" : email,
    "fullname":  fullName,
    "phone":  phoneNumber,
    "type":  guest,
  }


  axios.post("https://gtexterp.herokuapp.com/api/clockin/create", data, config)
  .then (response => {
    console.log(response);
      console.log(response.data)
      toast.success("Clocked In successfully!")
      
      //navigate("/checkin");
      console.log(response.data.data.fullname);
      localStorage.setItem("fullName", response.data.data.fullname);
      localStorage.setItem("checkInEmail", response.data.data.email);
      localStorage.setItem("clockInTime", response.data.data.check_in_time);
  
  })
  .catch(err => {
      console.error(err.response)
      //setErrorMsg(err.data.message)
  })

  };


  function submitout(checkInEmail) {
    var token = localStorage.getItem("accessToken");

    const config = {
        headers: {
         contentType : "application/json",
         Authorization : "Bearer " +  token
     }
      }

  const data = {
    email : checkInEmail ,
  } 

  console.log("data", data)

  axios.post("https://gtexterp.herokuapp.com/api/clockin/logout", data, config)
  .then (response => {
    console.log(response);
      console.log(response.data);

      toast.success("Clocked out successfully!")
      // alert('Check out successfully');
      //navigate(-1);
  
  })
  .catch(err => {
      console.error(err.response)
      //setErrorMsg(err.data.message)
  })
    
  }



  return (
    <div>

     

      <Table striped bordered hover>
        <thead>
          <tr>
            {/* <th>#</th> */}
            <th>Full Name</th>
            <th>Email</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Action</th>
            {/* <th>Delete</th> */}
          </tr>
        </thead>
        {/* {errorMessage && <div>{errorMessage}</div>} */}
        {isLoading && (
          <div>
            <LoadingSpinner />
          </div>
        )}

        <tbody>
          {employeeInfos.map((employeeInfo, employeeInfoIndex) => (
            <tr key={employeeInfo._id} value={employeeInfo.id}>
              {/* <td>1</td> */}

              <td>{employeeInfo.fullname}</td>
              <td>{employeeInfo.email}</td>
              <td>{moment(employeeInfo.check_in_time).format('LLLL')}</td>
              <td>{moment(employeeInfo.check_out_time).format('LLLL')}</td>
              <td> 
                <button onClick={()=>submitout(employeeInfo.email)}>Clock Out</button>
              </td>
              {/* <td><button className="sm-btn" onClick={deleteHandler}>Delete</button></td> */}
            </tr>
          ))}
        </tbody>
        {/* <tbody id='table_body'>
      </tbody> */}
      </Table>
     

        

      


    </div>
  );
};

const FormContainer = styled.div`
  display: flex;
  justify-content: flex start;
  flex-direction: column;

`;

const FormItem = styled.div`
  display: flex;
  justify-content: center;
`;

export default ClockingTable;
