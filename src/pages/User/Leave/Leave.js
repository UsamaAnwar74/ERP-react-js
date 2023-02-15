import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import Leaveform from "./Leaveform";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import swal from "sweetalert";


const Employee = (props) => {
  const navigate = useNavigate();
  const [employeeInfos, setEmployeeInfos] = useState([]);
  const [activeClass, setActiveClass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);


  

  const handleIdNavigation = () => {
    navigate("employeeId");
  };

  useEffect(() => {
    setIsLoading(true);
    var token = localStorage.getItem("accessToken");
    console.log(token);
    if (!token) {
      navigate("/login");
    }

    const headers = {
      contentType: "application/json",
      Authorization: "Bearer " + token,
    };

    axios
      .get("https://gtexterp.herokuapp.com/api/staff/get", {
        headers: headers,
      })
      .then((response) => {
        if (!response) {
          throw Error("Could not fetch the data for that resource");
        }
        setIsLoading(false);
        console.log(response.data.data,);
        let employeeData = response.data.data;
        employeeData = employeeData.sort().reverse();
        setEmployeeInfos([...employeeData]);
        setErrorMessage(null);
        let objectData = response.data.data;
        objectData = objectData.sort().reverse;
       // console.log(employeeData.length, "erp")

        let tableData;
        objectData.map((value, index) => {
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
        setErrorMessage(err.message);
        console.error(err);
      });
  }, []);


  async function deleteHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });

    var organization = localStorage.getItem("organization");


    var token = localStorage.getItem("accessToken");

    const config = {
      headers: {
        contentType: "application/json",
        Authorization: "Bearer " + token,
      },
    };

    axios
      .delete(`https://gtexterp.herokuapp.com/api/staff/delete?id=`, config)
      .then((response) => {
        setIsLoading(false);

        


        console.log(response)
        console.log(response.data, "the money is nigeria");
        console.log("12345");
        toast.success('Staff created successfully');
        navigate(-1);
      })
      .catch((err) => {
        console.error(err.response);
        toast.error(err.response.data.message);
        setIsLoading(false);
        console.log(err.response.data.message);
        //setErrorMsg(err.data.message)
      });

    // }
  }



  const toggleForm = () => {
    setActiveClass(!activeClass);
  };

  return (
    <div>
      <button className="sm-btn" onClick={toggleForm}>
        Add Leave
      </button>
      <div className={`employeeform-container ${activeClass ? "show" : ""}`}>
        <div
          onClick={toggleForm}
          className={`employeeform-overlay ${activeClass ? "show" : ""}`}
        ></div>
        <div className={"employee-form"}>
          <Leaveform toggleForm={toggleForm} />
        </div>
      </div>

      <div className="back d-flex">
      <button onClick={() => navigate(-1)} className="sm-btn">
                Back
              </button>
      </div>
      

      <Table striped bordered hover>
        <thead>
          <tr>
            {/* <th>#</th> */}
            <th>Name</th>
            <th>Type</th>
            <th>Application</th>
            <th>Department</th>
            <th>Leave Policy</th>
            <th>Leave Count</th>

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

              <td>
                <Link
                  to={`/user/${employeeInfo._id}`}
                  key={employeeInfoIndex}
                  state={employeeInfo}
                  style={{
                    textDecoration: "none",
                    width: "70px",
                    height: "70px",
                  }}
                >
                  {employeeInfo.first_name}
                </Link>
              </td>

              <td>{employeeInfo.last_name}</td>
              <td>{employeeInfo.email}</td>
              <td>{employeeInfo.gender}</td>
              <td>{employeeInfo.profession}</td>
              <td></td>
             


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

export default Employee;
