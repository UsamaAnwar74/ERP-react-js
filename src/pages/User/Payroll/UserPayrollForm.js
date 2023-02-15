import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UserPayRollForm = ({ toggleForm }, props) => {
  const navigate = useNavigate();

  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [basicPay, setBasicPay] = useState(0);
  const [accountName, setAccountName] = useState("");

  const [educationInfo, setEducationInfo] = useState({});
  const [departmentId, setDepartmentId] = useState("");

  const params = useParams();
  console.log(params);

  async function HandleSubmit(event) {
    event.preventDefault();

    var organization = localStorage.getItem("organization");

    const data = {
      bank_name: bankName,
      account_number: accountNumber,
      basic_pay: basicPay,
      staff: params.userid,
      account_name: accountName,
      //   staff: params.userid,
      // "636e385053f572a881482463"
    };

    var token = localStorage.getItem("accessToken");

    const config = {
      headers: {
        contentType: "application/json",
        Authorization: "Bearer " + token,
      },
    };

    console.log("okereke nneoma");

    axios
      .post("https://gtexterp.herokuapp.com/api/bank/create", data, config)
      .then((response) => {
        // console.log(response);
        // console.log(response.data.user, "nigeria my country");
        // console.log("12345");
        toast.success("Bank details have been successfully added");
       // alert("Bank details have been successfully added ");
        navigate(-1);
      })
      .catch((err) => {
        console.error(err.response);
        toast.error(err.response.data.message.message);
        //setErrorMsg(err.data.message)
      });

    // }
  }

  return (
    <div>
      <div className="educationForm">
        <div className="edu-top-title">
          <h5>Add Payment</h5>
          <h4
            onClick={() => {
              toggleForm();
            }}
          >
            X
          </h4>
        </div>
        <form onSubmit={HandleSubmit}>
          <div>
            <img src="" className="" />
          </div>
          <div className="education-form-container">
            <div className="employee-form-input">
              <label htmlFor="bank-name">Bank Name</label>
              <input
                className="input-field"
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="account-number">Account Number</label>
              <input
                className="input-field"
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="basic-pay">Basic Pay</label>
              <input
                className="input-field"
                type="number"
                value={basicPay}
                onChange={(e) => setBasicPay(e.target.value)}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="accountName">Account Name</label>
              <input
                className="input-field"
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
            </div>
          </div>
          <div className="employee-form-container-button">
            <button type="submit">SAVE</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserPayRollForm;
