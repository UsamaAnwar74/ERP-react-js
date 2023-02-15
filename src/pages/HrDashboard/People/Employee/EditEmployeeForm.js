import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";

const EditEmployeeForm = ({ toggleForm }, props) => {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
      phone: "",
      position: "",
      first_name: "",
      last_name: "",
      gender: "",
      date_birth: "",
      marital_status: "",
      country: "",
      house_number: "",
      house_address: "",
      city: "",
      state: "",
      profession: "",
      department: "",
      organization: "",
  });
const id = useParams();

 const {email, position, phone, first_name, last_name, gender, date_birth, marital_status, country, house_number, house_address , city, state, profession, department, organization } = user;

 var token = localStorage.getItem("accessToken");

 const config = {
   headers: {
     contentType: "application/json",
     Authorization: "Bearer " + token,
   },
 };

 useEffect(() => {
    loadUser();
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

  async function EditButtonHandler(event) {
    event.preventDefault();
    setIsLoading(true);

    var organization = localStorage.getItem("organization");



    var token = localStorage.getItem("accessToken");

    const config = {
      headers: {
        contentType: "application/json",
        Authorization: "Bearer " + token,
      },
    };

    axios
      .put(`https://gtexterp.herokuapp.com/api/staff/update?id=${id.userid}`, user, config)
      .then((response) => {
        console.log(response)
        setIsLoading(false);
        
        
        console.log(response.data, "the money is nigeria");
      
        toast.success('staff details has been updated');
        // alert("Staff created successfully ");
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


  const loadUser = async() => {
    const result = await axios.get(`https://gtexterp.herokuapp.com/api/staff/one?id=${id.userid}`, config )
   // console.log("yes lord",result.data.data);

    setUser(result.data.data);
  }



  return (
    <div>
      <div className="employeeForm">
        <div className="top-title">
          <h5>Edit Employee</h5>
          <h4
            onClick={() => {
              toggleForm();
            }}
          >
            X
          </h4>
        </div>
        <form onSubmit={EditButtonHandler}>
          <div style={{ margin: "40px" }} className="employee-form-container">
            <div className="employee-form-input">
              <label htmlFor="first-name">First Name</label>
              <input
                className="input-field"
                type="text"
                name="first_name"
                value={first_name}
                onChange={(e) => setUser({...user,   first_name: e.target.value})}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="first-name">Last Name</label>
              <input
                className="input-field"
                type="text"
                name="last_name"
                value={last_name}
                onChange={(e) => setUser({...user, last_name : e.target.value })}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="email">Email</label>
              <input
                className="input-field"
                type="text"
                name="email"
                value={email}
                onChange={(e) => setUser({...user, email: e.target.value})}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="phone">Phone Number</label>
              <input
                className="input-field"
                type="number"
                name="phone"
                value={phone}
                onChange={(e) => setUser({...user, phone : e.target.value})}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="position">Position</label>
              <input
                className="input-field"
                type="text"
                name="position"
                value={position}
                onChange={(e) => setUser({...user, position : e.target.value})}
              />
            </div>


            <div className="employee-form-input">
              <div>Gender</div>
              <select
                style={{}}
                className="input-field"
                name="gender"
                value={gender}
                onChange={(e) => {
                    setUser({...user, gender : e.target.value});
                }}
              >
                <option value="default" className="input-field">
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
                className="input-field"
                type="date"
                name="date_birth"
                value={date_birth}
                onChange={(e) => setUser({...user, date_birth : e.target.value})}
              />
            </div>


            <div className="employee-form-input">
              <div>Marital Status</div>
              <select
                style={{}}
                className="input-field"
                name="marital_status"
                value={marital_status}
                onChange={(e) => {
                    setUser({...user, marital_status  : e.target.value});
                }}
              >
                <option value="default" className="input-field">
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
                className="input-field"
                type="text"
                name="country"
                value={country}
                onChange={(e) => setUser({...user, country : e.target.value})}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="houseNumber">House Number</label>
              <input
                className="input-field"
                type="text"
                name="house_number"
                value={house_number}
                onChange={(e) => setUser({...user, house_number : e.target.value})}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="houseAddress">House Address</label>
              <input
                className="input-field"
                type="text"
                name="house_address"
                value={house_address}
                onChange={(e) => setUser({...user, house_address : e.target.value})}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="city">city</label>
              <input
                className="input-field"
                type="text"
                name="city"
                value={city}
                onChange={(e) => setUser({...user, city : e.target.value})}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="state">State</label>
              <input
                className="input-field"
                type="text"
                name="state"
                value={state}
                onChange={(e) => setUser({...user, state : e.target.value})}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="profession">Profession</label>
              <input
                className="input-field"
                type="text"
                name="profession"
                value={profession}
                onChange={(e) => setUser({...user, profession : e.target.value})}
              />
            </div>
            <div className="employee-form-input">
              <div>Department</div>
              <select
                style={{}}
                className="input-field"
                name="department"
                // value={department}
                onChange={(e) => {
                  setDepartmentId(e.target.value);
                }}
              >
                {departments && Array.isArray(departments)
                  ? departments.map((department) => {
                      console.log("department", department);

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

export default EditEmployeeForm;
