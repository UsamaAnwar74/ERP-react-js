import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const Leaveform = ({ toggleForm }, props) => {
  const navigate = useNavigate();
  
  const [employeeInfos, setEmployeeInfos] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [gender, setGender] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [country, setCountry] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [houseAddress, setHouseAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [profession, setProfession] = useState("");

  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState("");

  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    // const fetchData = (inputValue, callback ) => {
      setIsLoading(true);
    var token = localStorage.getItem("accessToken");
    const headers = {
        contentType: "application/json",
        Authorization: "Bearer " + token,
      };

    const config = {
      headers: {
        contentType: "application/json",
        Authorization: "Bearer " + token,
      },
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
      let objectData = response.data.data;
      objectData = objectData.sort().reverse;
      console.log(setEmployeeInfos, "erp")
    })






    // let getDepartmentOptions = async () => {
    axios
      .get("https://gtexterp.herokuapp.com/api/department/get", config)
      .then((response) => {
        setIsLoading(false);
        let departmentData = response.data.data;
        setDepartments([...departmentData]);
      })
      .catch((err) => {
        console.error(err.response);
        //setErrorMsg(err.data.message)
      });
  }, []);

  // useEffect( () => {
  //   // const fetchData = (inputValue, callback ) => {
  //   var token = localStorage.getItem("accessToken")

  //   const config = {
  //     headers: {
  //      contentType : "application/json",
  //      Authorization : "Bearer " +  token
  //  }
  //   }
  //   // let getDepartmentOptions = async () => {
  //      axios.get("https://gtexterp.herokuapp.com/api/organization/get", config)
  //      .then (response => {
  //       console.log(response);
  //         console.log( "gvcchjewfgfhj" ,response.data.data)
  //     console.log('12345');
  //     let organizationData = response.data.data
  //     setOrganizations([...organizationData])
  //     console.log(setOrganizations([...organizationData]));

  //     })
  //     .catch(err => {
  //         console.error(err.response)
  //         //setErrorMsg(err.data.message)
  //     })
  // }, [])

  async function HandleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    var organization = localStorage.getItem("organization");

    const data = {
      email: email,
      phone: phone,
      position: position,
      first_name: firstName,
      last_name: lastName,
      gender: gender,
      date_birth: dateBirth,
      marital_status: maritalStatus,
      country: country,
      house_number: houseNumber,
      house_address: houseAddress,
      city: city,
      state: state,
      profession: profession,
      department: departmentId,
      organization: organization,
      // "636e385053f572a881482463"
    };

    var token = localStorage.getItem("accessToken");

    const config = {
      headers: {
        contentType: "application/json",
        Authorization: "Bearer " + token,
      },
    };

    axios
      .post("https://gtexterp.herokuapp.com/api/staff/create", data, config)
      .then((response) => {
        setIsLoading(false);
        toast.success('Staff created successfully');
        alert("Staff created successfully ");
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

  




  return (
    <div>
      <div className="employeeForm2">
        <div className="top-title">
          <h5>Add Leave Type</h5>
          <h4
            onClick={() => {
              toggleForm();
            }}
          >
            X
          </h4>
        </div>
        <form onSubmit={HandleSubmit}>
          <div style={{ margin: "10px" }} className="employee-form-container2">
            <div className="employee-form-input">
                
              <div>Employee Name</div>
              <select
                style={{}}
                className="input-field2 form-control"
                // value={props.departments}
                onChange={(e) => {
                    employeeInfos(e.target.value);
                }}
              >
                <option value="default" className="input-field2">
                  Choose Employee
                </option>
                {employeeInfos && Array.isArray(employeeInfos)
                  ? employeeInfos.map((employeeInfos) => {
                      // console.log("department", department);

                      return (
                        <option key={employeeInfos._id} value={employeeInfos._id}>
                          {employeeInfos.first_name}

                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
            <div className="employee-form-input">
              <label htmlFor="first-name">Type</label>
              <select
                className="input-field2 form-control"
                // value={props.departments}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <option value="default" className="input-field2 form-control">
                  -Select-
                </option>
                <option>Annual leave</option>
                <option>Sick leave</option>
                <option>Maternity leave</option>
                <option>Parental leave</option>                    
                  
              </select>
            </div>
            <div className="employee-form-input">
              <label htmlFor="email">Application</label>
              <select
                style={{}}
                className="input-field form-control"
                // value={props.departments}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <option value="default" className="input-field form-control">
                  -Select-
                </option>
                <option>All Employees</option>
                <option>Specific Employees</option>
                                 
                  
              </select>
            </div>
            <div className="employee-form-input">
              <div>Department</div>
              <select
                style={{}}
                className="input-field2 form-control"
                // value={props.departments}
                onChange={(e) => {
                  setDepartmentId(e.target.value);
                }}
              >
                <option value="default" className="input-field2">
                  Choose Department
                </option>
                {departments && Array.isArray(departments)
                  ? departments.map((department) => {
                      // console.log("department", department);

                      return (
                        <option key={department._id} value={department._id}>
                          {department.name}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
            {/* <div className="employee-form-input">
            <div>Designation</div>
            <select
                style={{}}
                className="input-field form-control"
                // value={props.departments}
                onChange={(e) => {
                  setDepartmentId(e.target.value);
                }}
              >
                <option value="default" className="input-field">
                  Choose Designation
                </option>
                {departments && Array.isArray(departments)
                  ? departments.map((department) => {
                      // console.log("department", department);

                      return (
                        <option key={department._id} value={department._id}>
                          {department.name}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div> */}
            
            {/* <div className="employee-form-input">
            <div>Location</div>
            <select
                style={{}}
                className="input-field form-control"
                // value={props.departments}
                onChange={(e) => {
                  setDepartmentId(e.target.value);
                }}
              >
                <option value="default" className="input-field">
                  Choose Location
                </option>
                {departments && Array.isArray(departments)
                  ? departments.map((department) => {
                      // console.log("department", department);

                      return (
                        <option key={department._id} value={department._id}>
                          {department.name}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div> */}

            {/* <div className="employee-form-input" >
          <h5>Leave Policy</h5>
          
        </div> */}
            <div className="employee-form-input">
              <div>Leave Policy</div>
              <select
                style={{}}
                className="input-field2 form-control"
                // value={props.departments}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <option value="default" className="input-field2 form-control">
                  -Choose-
                </option>
                        <option>Yearly</option>
                        <option>Monthly</option>
                    
                  
              </select>
            </div>






            {/* <div className="employee-form-input">
              <label htmlFor="gender">Gender </label>
              <input
                className="input-field"
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div> */}


            <div className="employee-form-input">
              <label htmlFor="dateBirth">Leave Count</label>
              <input
                className="input-field2 form-control"
                type="text"
                style={{height:63 , width:"65%"}}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            
            




            {/* <div className="employee-form-input">
              <label htmlFor="maritalStatus">Marital Status</label>
              <input
                className="input-field"
                type="text"
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
              />
            </div> */}


          
            
           
           
            
            {/* <div className="employee-form-input">
            <select
            className="input-field"
            // value={props.departments}
            onChange={(e) => {
              setOrganizationId(e.target.value);
            }}
                >
                  
                    <option value="default" className="input-field" >Choose an option</option>
                    {organizations && Array.isArray(organizations)
                      ? organizations.map((organization) => {
                    console.log("organization", organization);

                              return (
                                  <option key={organization._id} value={organization._id}>
                                      {organization.name}
                                  </option>
                              );
                          })
                        : null}
                </select>
            </div> */}
          </div>
          <div className="employee-form-container-button">
            {isLoading === true ? <LoadingSpinner /> : 
            <button type="submit">SAVE</button>
          }
          </div>
        </form>
      </div>
    </div>
  );
};

export default Leaveform;
