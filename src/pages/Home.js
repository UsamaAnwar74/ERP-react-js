import { Link } from "react-router-dom";
import TopNav from "../components/TopNav";
import HomeCards from "./HomeCards";
import Calculator from "../images/calculator.png";
import Sales from "../images/sales.png";
import Admin from "../images/admin.png";
import Compliance from "../images/compliance.png";
import ClockingSys from "../images/admin.png";
import Hr from "../images/hr.png";
import Crm from "../images/crm.png";
import Construction from "../images/construction.png";
import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [deepartment, setdeepartment] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const navigate = useNavigate();
  const department = [
    {
      depIcon: Calculator,
      depName: "Account",
      depLink: "/accounts",
    },
    {
      depIcon: Sales,
      depName: "Sales",
      depLink: "/sales",
    },
    {
      depIcon: Admin,
      depName: "Admin",
      depLink: "/admin",
    },
    {
      depIcon: Compliance,
      depName: "Project Management",
      depLink: "/pm",
    },
    {
      depIcon: Admin,
      depName: "Clocking  System",
      depLink: "clocking",
    },
    {
      depIcon: Hr,
      depName: "Human Resources",
      depLink: deepartment === 'Human Resource'? "/hr-dashboard": '/',
    },
    { depIcon: Crm, depName: "CRM", depLink: "/crm" },
    {
      depIcon: Construction,
      depName: "Staff",
      depLink: "/staff",
    },
    // {
    //   depIcon: Construction,
    //   depName: "Expenses",
    //   depLink: "Expenses",
    // },
    // {
    //   depIcon: Construction,
    //   depName: "Income",
    //   depLink: "Income",
    // },

  ];

  
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


    
    axios.get(`https://gtexterp.herokuapp.com/api/department/one?id=${department}`, {
        headers : headers
    })
        .then(response => {
          setIsLoading(false);
            // console.log(response.data.data, "yessssssssssssssssss")
            let payrollData = response.data.data.name
            setdeepartment(payrollData);
              }) 
              .catch(err=> {
                  console.error(err)
              });


            }, []);

  return (
    <div>
      <div className="top-banner">
        <TopNav />
        <section className="banner">
          <h1>Choose Your Department</h1>
          <p>
          Welcome to Gtext ERP System.
          </p>
        </section>
      </div>
      <section className="dep-cards">
        {department.map((dep) => (
          <Link to={dep.depLink} key={dep.id}>
            <HomeCards dep={dep} />
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Home;
