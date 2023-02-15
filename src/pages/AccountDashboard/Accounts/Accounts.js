import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TopNav from "../../../components/TopNav";
import { toast } from "react-toastify";

const Accounts = () => {
 
  const current = new Date();
  const [time, setTime] = useState(current.toLocaleTimeString("en-US"));

  const navigate = useNavigate();

  useEffect(() => {

  }, [])


  const handleSubmit = async (e) => {
    // auth.login(email);
    e.preventDefault();
    var token = localStorage.getItem("accessToken");

    const config = {
        headers: {
         contentType : "application/json",
         Authorization : "Bearer " +  token
     }
  }

  const data = {
    email : "" ,
  } 

  axios.post("https://gtexterp.herokuapp.com/api/clockin/logout", data, config)
  .then (response => {
    console.log(response);
      console.log(response.data);

      toast.success("Clocked out successfully!")
      navigate(-1);
  
  })
  .catch(err => {
      console.error(err.response)
  })

  };




  return (
    <div className=" bg">
      <TopNav name="Clocking System" />
      <div className=" px-5">
        <h1>Accounts | {time}</h1>
      </div>
    </div>
  );
}

export default Accounts;
