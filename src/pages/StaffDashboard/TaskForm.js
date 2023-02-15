import React from "react";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";



const TaskForm = ({ toggleForm }, props) => {


  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignTo, setAssignTo] = useState([]);
  const [assignToDepartment, setAssignToDepartment] = useState("")
  const [isLoading, setIsLoading] = useState(false);
 


  const navigate = useNavigate();
  const department = localStorage.getItem('department');
  console.log(department, "yyyyyyyyyyyyyyyyyyy");

  console.log(assignToDepartment, "ttttttttttttttt");

 


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
      .get(`https://gtexterp.herokuapp.com/api/staff/by_depaftment?id=${department}`, config)
      .then((response) => {
        setIsLoading(false);
        console.log(response);
        console.log("gvcchjewfgfhj", response.data.data);
        console.log("12345");
        let assignToData = response.data.data;
        setAssignTo([...assignToData]);
        console.log(setAssignTo([...assignToData]));
      })
      .catch((err) => {
        console.error(err.response);
        //setErrorMsg(err.data.message)
      });
  }, []);


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    var token = localStorage.getItem("accessToken")
    var organization = localStorage.getItem("organization")

    const config = {
        headers: {
         contentType : "application/json",
         Authorization : "Bearer " +  token
     }
      }

  const data = {
    name : name ,
    description : description,
    dueDate : dueDate,
    assigned_to : assignToDepartment,
  } 

  axios.post("https://gtexterp.herokuapp.com/api/task/create", data, config)
  .then (response => {
    console.log(response);
    setIsLoading(false);
      localStorage.setItem("departmentId", response.data.data._id);
      toast.success("Task created  successfully!");
      window.location.reload(); 
      // navigate(-1);
  
  })
  .catch(err => {
      console.error(err.response);
      toast.error(err.response.data.message);
    
      
    
  })

  };









  return (
    <div className="taskForm">
      <div className="employeeForm">
        <div className="top-title">
          <h5>New Task</h5>
          <h4
            onClick={() => {
              toggleForm();
            }}
          >
            X
          </h4>
        </div>
        <div className="justify-content-center align-items-center">
        <form className="w-100" onSubmit={handleSubmit}>
          <div style={{ margin: "40px" }} className="employee-form-container1">
            <div className="employee-form-input1">
              <label htmlFor="first-name"> Name Of Task</label>
              <input
                className="input-field form-control"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="first-name">Description </label>
              <input
                className="input-field form-control"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="employee-form-input">
              <label htmlFor="dateBirth">Due Date</label>
              <input
                className="input-field form-control"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>


            <div className="employee-form-input">
              <div>Assign To</div>
              <select
                style={{}}
                className="input-field form-control"
                // value={props.departments}
                onChange={(e) => {
                  setAssignToDepartment(e.target.value);
                }}
              >
                <option value="default" className="input-field">
                  Assigned To
                </option>
                {assignTo && Array.isArray(assignTo)
                  ? assignTo.map((assignedTo) => {
                      // console.log("department", department);

                      return (
                        <option key={assignedTo._id} value={assignedTo._id}>
                          {assignedTo.first_name} {assignedTo.last_name}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
          
           
          </div>
          <div className="employee-form-container-button">
            {isLoading === true ? <LoadingSpinner /> : 
            <button type="submit">SAVE</button>
          }
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
