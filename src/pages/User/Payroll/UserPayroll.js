import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import {  useParams } from "react-router-dom";
import UserPayRollForm from "./UserPayrollForm";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const UserPayroll = () => {
  const [activeClass, setActiveClass] = useState(false);
const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userPayRoll, setUserPayRoll] = useState({});


  const params = useParams();
  console.log(  "evelyn",params.userid, "evelyn");

  const toggleForm = () => {
    setActiveClass(!activeClass);
  };


  useEffect(() => {
    setIsLoading(true)
    var token = localStorage.getItem("accessToken")
   
  
  
    const config = {
      headers: {
       contentType : "application/json",
       Authorization : "Bearer " +  token
   }
    }
    
    axios.get(`https://gtexterp.herokuapp.com/api/bank/get?id=${params.userid}`, config)
        .then(response => {
          // if(response.data != true){
          //   alert("no data found")
          //   throw Error('Could not fetch the data for that resource');
          // }
          console.log("what's up with you");
          console.log(response.data);
          setIsLoading(false)
            console.log(response.data.data, "ggggggggggggggggggggggggggggggggggggg")
            let payRollInfo = response.data.data
            setUserPayRoll(payRollInfo);
            console.log( setUserPayRoll(payRollInfo), "payroll");
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
      {isLoading && <LoadingSpinner /> }
      <STableContainer>
        <STitle>Payroll Basic Payment</STitle>
        <SRow>
          <SData>Basic Pay</SData>
          <SData>
            <SGrey>{userPayRoll.basic_pay}</SGrey>
          </SData>
        </SRow>
        <SRow>
          <SData>Bank Account Number</SData>
          <SData>
            <SGrey>{userPayRoll.account_number}</SGrey>
          </SData>
        </SRow>
        <SRow>
          <SData>Bank Account Name</SData>
          <SData>
            <SGrey>{userPayRoll.account_name}</SGrey>
          </SData>
        </SRow>
        <SRow>
          <SData>Bank Name</SData>
          <SData>
            <SGrey>{userPayRoll.bank_name}</SGrey>
          </SData>
        </SRow>
      </STableContainer>
      <STableContainer>
      <button className="sm-btn my-3" onClick={toggleForm}>Add Payment Roll</button>
      <div className={`employeeform-container ${activeClass ? "show" : ""}`}>
        <div
          onClick={toggleForm}
          className={`employeeform-overlay ${activeClass ? "show" : ""}`}
        ></div>
        <div className={"employee-form"}>
          <UserPayRollForm toggleForm={toggleForm}
           />
        </div>
      </div>
        {/* <Table>
          <thead>
            <tr>
              <th>Pay Item</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Accomodation Allowance</td>
              <td>5000</td>
            </tr>
            <tr className="mx-3">
              <td>Transportation Allowance</td>
              <td>5000</td>
            </tr>
            <button className="sm-btn my-3">Add Allowance</button>
          </tbody>
        </Table> */}
      </STableContainer>
    </div>
  );
};

export default UserPayroll;

const STableContainer = styled.div`
  width: 700px;
  margin: 30px auto;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
`;
const STitle = styled.div`
  background-color: #901c42;
  color: white;
  height: 70px;
  width: 100%;
  font-weight: 700;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px 10px 0px 0px;
`;
const SRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 120px;
`;
const SData = styled.div`
  text-align: left;
  width: 50%;
`;

const SGrey = styled.div`
  background-color: #f5f5f5;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  padding: 5px 10px;
`;
