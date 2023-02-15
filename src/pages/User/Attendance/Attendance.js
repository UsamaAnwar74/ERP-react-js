import React from "react";
import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import formatDistance from 'date-fns/formatDistance';
import moment from 'moment';
import { Table } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
// import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";









const Attendance = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [clockedInInfos, setClockedInInfos] = useState([]);
  // const [departments, setDepartments] = useState([]);
  // const [activeClass, setActiveClass] = useState(false);
  // const [designationInfos, setDesignationInfos] = useState([]);



  useEffect(() => {
    var token = localStorage.getItem("accessToken")
    console.log(token)
    setIsLoading(true);
   

    const headers = {
        contentType : "application/json",
        Authorization : "Bearer " +  token
    }
    
    axios.get("https://gtexterp.herokuapp.com/api/clockin/all", {
        headers : headers
    })
        .then(response => {
          setIsLoading(false);
            console.log(response.data.data)
            let clockInData = response.data.data
            clockInData = clockInData.sort().reverse();
            setClockedInInfos([...clockInData]);
            // let objectData = response.data.data;
            // objectData = objectData.sort().reverse();

              }) 
              .catch(err=> {
                  console.error(err)
              })
      }, [])




  return (
    <div>
      <div className="" style={{ margin: "30px 0px" }}>
        <Table striped bordered hover>
        <thead>
        <tr>
          {/* <th>#</th> */}
          <th>FullName</th>
          <th>Email</th>
          <th>Clock In Time </th>
          <th>Clock Out Time </th>
          {/* <th>Salary Earned For the Day</th> */}
        
        </tr>
      </thead>
      {isLoading && <div><LoadingSpinner /></div>}
      <tbody>
        {clockedInInfos.map((clockedInInfo, clockedInInfoIndex) => (
          <tr key={clockedInInfo._id} value={clockedInInfo.id}>
       
       {/* <td>1</td> */}
       <td>{clockedInInfo.fullname}</td>
       <td>{clockedInInfo.email}</td>
        <td>{moment(clockedInInfo.check_in_time).format('LLLL')}</td>
        <td>{moment(clockedInInfo.check_out_time).format('LLLL')}</td>
     {/* <td>₦{clockedInInfo.amount_earned.toFixed(1)}</td> */}
      
     
     </tr>
        ))}
      
      </tbody>
      {/* <tbody id='table_body' /> */}
    
        </Table>
      </div>
    </div>
  );
};

export default Attendance;
