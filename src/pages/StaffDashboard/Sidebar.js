import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import styled from "styled-components";
import "./staff.css";



const Sidebar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [departmentInfos, setDepartmentInfos] = useState([]);



  useEffect(() => {
    setIsLoading(true)
    var token = localStorage.getItem("accessToken")
    console.log(token)
    if(!token) {
        Navigate("/login");
    }
  
    const headers = {
        contentType : "application/json",
        Authorization : "Bearer " +  token
    }
    
    axios.get("https://gtexterp.herokuapp.com/api/department/get", {
        headers : headers
    })
        .then(response => {
          setIsLoading(false);
            console.log(response.data.data, "yess")
            let departmentData = response.data.data;
            departmentData = departmentData.sort().reverse();
            setDepartmentInfos([...departmentData]);
            let objectData = response.data.data;
            objectData = objectData.sort().reverse();
  
   
              }) 
              .catch(err=> {
                  console.error(err)
              })
      }, [])



  return (
<div className="sidebar">
  <ul>
  {departmentInfos.map((departmentInfo, departmentInfoIndex) => (
    <li><Link to={departmentInfo._id} >{departmentInfo.name}</Link></li>
    ))}
    
  </ul>
  </div>


    // <Container>
    //   <h1>STAFF</h1>
    //   <ul>
    //     <List>Welcome</List>
    //     <NavLink to="/staff/humanresource">
    //       <List>Humman Resource</List>
    //     </NavLink>
    //     <NavLink to="/staff/media">
    //       <List>Media</List>
    //     </NavLink>
    //     <NavLink to="/staff/account">
    //       <List>Accounting</List>
    //     </NavLink>
    //   </ul>
    // </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3rem
  // justify-content: center;
  align-items: center;
  width: 250px;
  height: 100vh;
  box-shadow: 0px 0px 13px 0px;
`;

const List = styled.div`
  padding: 10px 30px;
`;

export default Sidebar;
