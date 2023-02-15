import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Payroll = () => {
  const [payroll, setPayRoll] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const navigate = useNavigate();

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

        const department = localStorage.getItem('department');
        console.log('department', department)


        
        axios.get(`https://gtexterp.herokuapp.com/api/payroll/month`, {
            headers : headers
        })
            .then(response => {
              setIsLoading(false);
                console.log(response.data.data, "yessssssssssssssssss")
                let payrollData = response.data.data
                setPayRoll([...payrollData]);
      
       
                  }) 
                  .catch(err=> {
                      console.error(err)
                  });


                }, []);

  

  return (
    <div>
      <button className="sm-btn">Export Payroll</button>
      <div style={{ margin: "30px 0px" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Staff Name</th>
              <th>Salary</th>
              <th>Month</th>
              <th>Phone Number</th>
              <th>Account Number</th>
            </tr>
          </thead>
          <tbody>
            {payroll.map((payrollInfo, setPayrollInfoIndex) => (
              <tr key={payrollInfo._id} value={payrollInfo}>
              <td>{payrollInfo.staff_name}</td>
              <td>{payrollInfo.amount_earned}</td>
              <td>{payrollInfo.month}</td>
              <td>{payrollInfo.phone}</td>
              <td>{payrollInfo.acoount_number}</td>
            </tr>
            ))}
        
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Payroll;
