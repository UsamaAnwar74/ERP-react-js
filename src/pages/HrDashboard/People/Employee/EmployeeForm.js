import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";

const EmployeeForm = ({ toggleForm }, props) => {
  const navigate = useNavigate();

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

    const config = {
      headers: {
        contentType: "application/json",
        Authorization: "Bearer " + token,
      },
    };
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
      <div className="employeeForm">
        <div className="top-title">
          <h5>New Employee</h5>
          <h4
            onClick={() => {
              toggleForm();
            }}
          >
            X
          </h4>
        </div>
        <form onSubmit={HandleSubmit}>
          <div style={{ margin: "40px" }} className="employee-form-container">
            <div className="employee-form-input">
              <label htmlFor="first-name">First Name</label>
              <input
                className="input-field form-control"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="first-name">Last Name</label>
              <input
                className="input-field form-control"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="email">Email</label>
              <input
                className="input-field form-control"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="phone">Phone Number</label>
              <input
                className="input-field form-control"
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="position">Position</label>
              <input
                className="input-field form-control"
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>


            <div className="employee-form-input">
              <div>Gender</div>
              <select
                style={{}}
                className="input-field form-control"
                // value={props.departments}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <option value="default" className="input-field form-control">
                  Choose Gender
                </option>
                        <option>female</option>
                        <option>male</option>
                    
                  
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
              <label htmlFor="dateBirth">Date of Birth</label>
              <input
                className="input-field form-control"
                type="date"
                value={dateBirth}
                onChange={(e) => setDateBirth(e.target.value)}
              />
            </div>


            <div className="employee-form-input">
              <div>Marital Status</div>
              <select
                style={{}}
                className="input-field form-control"
                // value={props.departments}
                onChange={(e) => {
                  setMaritalStatus(e.target.value);
                }}
              >
                <option value="default" className="input-field form-control">
                  Choose Marital Status
                </option>
                        <option>single</option>
                        <option>married</option>
                    
                  
              </select>
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


            <div className="employee-form-input">
              <label htmlFor="country">Country</label>
              <input
                className="input-field form-control"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="houseNumber">House Number</label>
              <input
                className="input-field form-control"
                type="text"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="houseAddress">House Address</label>
              <input
                className="input-field form-control"
                type="text"
                value={houseAddress}
                onChange={(e) => setHouseAddress(e.target.value)}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="city">city</label>
              <input
                className="input-field form-control"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="state">State</label>
              <input
                className="input-field form-control"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="profession">Profession</label>
              <input
                className="input-field form-control"
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              />
            </div>
            <div className="employee-form-input">
              <div>Department</div>
              <select
                style={{}}
                className="input-field form-control"
                // value={props.departments}
                onChange={(e) => {
                  setDepartmentId(e.target.value);
                }}
              >
                <option value="default" className="input-field">
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

export default EmployeeForm;
