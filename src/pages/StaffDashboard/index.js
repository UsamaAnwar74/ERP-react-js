import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "./TaskForm";
import { Table } from "react-bootstrap";
import moment from "moment";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import IndividualTaskInfo from "./IndividualTaskInfo";

const Accounting = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [taskInfos, setTaskInfos] = useState({});
    const [allDepartmentTask, setAllDepartmentTask] = useState([]);
    const [individualDepartmentTask, setIndividualDepartmentTask] = useState([]);
    const [activeClass, setActiveClass] = useState(false);
    const [activeClass2, setActiveClass2] = useState(false);
    const [user, setUser] = useState({
      status: "",
    });

    const [selectValue, setValue] = useState("");

    const navigate = useNavigate();

    const paramsId = useParams();
    console.log("paramid", paramsId.staffId);

    const userid = localStorage.getItem('_id');
    const department = localStorage.getItem('department');
    console.log(userid, " userid d rock");
    console.log(department, "d boss ");


    const isHOD = localStorage.getItem("isHOD");
    var token = localStorage.getItem("accessToken");

    const { status } = user;

    const config = {
      headers: {
        contentType: "application/json",
        Authorization: "Bearer " + token,
      },
    };
   
    useEffect(() => {
       loadUser();
    }, []);


    const toggleForm = () => {
      setActiveClass(!activeClass);
    };


    
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

        {isHOD === true ? 
                
        axios.get(`https://gtexterp.herokuapp.com/api/task/all?id=${department}`, {
            headers : headers
        })
            .then(response => {
              setIsLoading(false);
                console.log(response.data.data, "yess all")
                let allDepartmentData = response.data.data
                setAllDepartmentTask([...allDepartmentData]);
      
       
                  }) 
                  .catch(err=> {
                      console.error(err)
                  })

                  :

                  axios.get(`https://gtexterp.herokuapp.com/api/task/get?id=${userid}`, {
                    headers : headers
                })
                    .then(response => {
                      setIsLoading(false);
                        console.log(response.data.data, "yess single")
                        let individualDepartmentData = response.data.data
                        setAllDepartmentTask([...individualDepartmentData]);
              
               
                          }) 
                          .catch(err=> {
                              console.error(err)
                          })

                        }


          }, [])

         

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
                console.log(response.data.data, "yess")
                let staffData = response.data.data
                setTaskInfos(staffData);
      
       
                  }) 
                  .catch(err=> {
                      console.error(err)
                  })
          }, [])


    function handleEditClick (id, status){
           setIsLoading(true); 

 
     var token = localStorage.getItem("accessToken");
     
     const data = {
      completed: status
     }
 
     const config = {
       headers: {
         contentType: "application/json",
         Authorization: "Bearer " + token,
       },
     };
 
    
     axios
       .put(`https://gtexterp.herokuapp.com/api/task/update?id=${id}`, data, config)
       .then((response) => {
         setIsLoading(false);
                
         toast.success('Task status details has been updated');
         window.location.reload(); 

       })
       .catch((err) => {
         console.error(err);
        //  toast.error(err.response.data.message);
         setIsLoading(false);
         console.log(err.response.data.message);
         //setErrorMsg(err.data.message)
       });
 
     // }
          }


          const loadUser = async() => {
            const result = await axios.get(`https://gtexterp.herokuapp.com/api/task/get?id=${userid}`, config )
            console.log("loadUser",result.data.data);
        
            setUser(result.data.data);
          }

          function indidualInfoHandler(allIndividualInfo) {
            
            navigate(`/staff/${allIndividualInfo._id}`);
            
            
         


          }

    

return (
  <div className="container-fluid p-5">
       <div className="d-flex justify-content-between ps-4 pe-4">
       <h3>{taskInfos.name}</h3> 
      <button onClick={() => navigate(-1)} className="sm-btn">
          Back
        </button>
       </div>


       
    <div>
    <button className="sm-btn" onClick={toggleForm}>Create Task</button>
      <div className={`employeeform-container ${activeClass ? "show" : ""}`}>
        <div
          onClick={toggleForm}
          className={`employeeform-overlay ${activeClass ? "show" : ""}`}
        ></div>
        <div className={"employee-form"}>
          <TaskForm toggleForm={toggleForm}
           />
        </div>
      </div>


      {/* <button className="sm-btn" onClick={toggleForm}>Create Task</button>
      <div className={`employeeform-container ${activeClass ? "show" : ""}`}>
        <div
          onClick={toggleForm}
          className={`employeeform-overlay ${activeClass ? "show" : ""}`}
        ></div>
        <div className={"employee-form"}>
          <IndividualTaskInfo toggleForm={toggleForm}
           />
        </div>
      </div> */}



  
      <div className="" style={{ margin: "30px 0px" }}>
        <Table striped bordered hover>
        <thead>
        <tr>
          
          <th>Name</th>
          <th>Assign to Name</th>
          <th>Due Date</th>
          <th>Status</th>
          <th>View</th>
          <th>Action</th>

          {/* <th>Edit</th> */}
          {/* <th>Delete</th> */}
        
        </tr>
      </thead>
      {isLoading === true && <div><LoadingSpinner /></div>}
      <tbody className="text-center">
      {allDepartmentTask.map((allDepartmentTaskInfo, allDepartmentTaskInfoIndex) => (
          <tr  key={allDepartmentTaskInfo._id} value={allDepartmentTaskInfo.id}>
       
          
          <td>{allDepartmentTaskInfo.name}</td>
          <td>{allDepartmentTaskInfo.assigned_to_name}</td>
          <td>{moment(allDepartmentTaskInfo.dueDate).format('LLLL')}</td>
         {  allDepartmentTaskInfo.completed === 'To Do' ?  <td class="badge rounded-pill  text-white mt-2  bg-danger" >{allDepartmentTaskInfo.completed}</td>: allDepartmentTaskInfo.completed === 'In progress' ? <td class="badge rounded-pill  mt-2  bg-warning text-dark" >{allDepartmentTaskInfo.completed}</td> :  allDepartmentTaskInfo.completed === 'In Review' ? <td class="badge rounded-pill  text-white mt-2  bg-primary" >{allDepartmentTaskInfo.completed}</td> : <td class="badge rounded-pill  text-white mt-2  bg-success" >{allDepartmentTaskInfo.completed}</td> }
          <td ><button  onClick={() => indidualInfoHandler(allDepartmentTaskInfo)} className="sm-btn">View</button></td>
          <td>    
            <select value={selectValue} onChange={(event) => handleEditClick(allDepartmentTaskInfo._id, event.target.value)}>
            <option value="To Do">Update Status</option>

            <option value="To Do">To Do</option>
            <option value="In progress">In progress</option>
            <option value="In Review"> In Review</option>
            <option value="Completed">Completed</option>
                </select></td>
          {/* <td><button className="sm-btn" onClick={() => editHandler(departmentInfo._id)}>Edit</button></td> */}
          {/* <td><button className="sm-btn" onClick={() => deleteHandler(departmentInfo._id)}>Delete</button></td> */}
       
        </tr>
      ))}
      </tbody>
      {/* <tbody id='table_body'>
      </tbody> */}
        </Table>
      </div>
    </div>
      
  </div>
)
}

export default Accounting;
