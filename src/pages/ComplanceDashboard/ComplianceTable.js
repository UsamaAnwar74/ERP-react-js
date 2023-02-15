import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import moment from "moment";
import { toast } from "react-toastify"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";





const ComplianceTable = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [taskInfos, setTaskInfos] = useState({});
    const [allProducts, setAllProducts] = useState([]);
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

        const department = localStorage.getItem('department');
        console.log('department', department)
        
        axios.get(`https://gtexterp.herokuapp.com/api/compliance/get`, {
            headers : headers
        })
            .then(response => {
              setIsLoading(false);
                console.log(response.data.data, "yess")
                let productData = response.data.data
                setAllProducts([...productData]);
      
       
                  }) 
                  .catch(err=> {
                      console.error(err)
                  })
          }, []);


          const followUpHandler = (id) => {

            console.log(id, "nifemi");
            setIsLoading(true);
            var token = localStorage.getItem("accessToken")
            var organization = localStorage.getItem("organization")
        
            const config = {
                headers: {
                 contentType : "application/json",
                 Authorization : "Bearer " +  token
             }
              }
        
        
        
          axios.post(`https://gtexterp.herokuapp.com/api/compliance/followup?id=${id}`, config)
          .then (response => {
            console.log(response);
            setIsLoading(false);
            //   localStorage.setItem("departmentId", response.data.data._id);
              toast.success("Task created  successfully!");
              window.location.reload(); 
              // navigate(-1);
          
          })
          .catch(err => {
            setIsLoading(false);
              console.error(err.response);
              toast.error(err.response.data.message);
            
              
            
          })
          }


      

    

return (
  <div className="container-fluid p-5">
       <div className="d-flex justify-content-end ps-4 pe-4">
    
      <button onClick={() => navigate(-1)} className="sm-btn">
          Back
        </button>
       </div>


       
    <div>
    {/* <button className="sm-btn" onClick={toggleForm}>Create Product</button>
      <div className={`employeeform-container ${activeClass ? "show" : ""}`}>
        <div
          onClick={toggleForm}
          className={`employeeform-overlay ${activeClass ? "show" : ""}`}
        ></div>
        <div className={"employee-form"}>
          <CrmForm toggleForm={toggleForm}
           />
        </div>
      </div> */}


 



  
      <div className="" style={{ margin: "30px 0px" }}>
        <Table striped bordered hover>
        <thead>
        <tr>
          
          <th>Name</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Action</th>

          {/* <th>Edit</th> */}
          {/* <th>Delete</th> */}
        
        </tr>
      </thead>
      {isLoading === true && <div><LoadingSpinner /></div>}
      <tbody className="text-center">
      {allProducts.map((allProductInfo, allProductInfoIndex) => (
          <tr  key={allProductInfo._id} value={allProductInfo.id}>
       
          
          <td>{allProductInfo.name}</td>
          <td>{allProductInfo.description}</td>
          <td>{moment(allProductInfo.dueDate).format("DD/MM/YYYY" )}</td>
          <td><button className="sm-btn" onClick={() => followUpHandler(allProductInfo._id)}>Follow Up</button></td>
          {/* <td>{moment(allDepartmentTaskInfo.dueDate).format('LLLL')}</td> */}
         {/* {  allDepartmentTaskInfo.completed === 'To Do' ?  <td class="badge rounded-pill  text-white mt-2  bg-danger" >{allDepartmentTaskInfo.completed}</td>: allDepartmentTaskInfo.completed === 'In progress' ? <td class="badge rounded-pill  mt-2  bg-warning text-dark" >{allDepartmentTaskInfo.completed}</td> :  allDepartmentTaskInfo.completed === 'In Review' ? <td class="badge rounded-pill  text-white mt-2  bg-primary" >{allDepartmentTaskInfo.completed}</td> : <td class="badge rounded-pill  text-white mt-2  bg-success" >{allDepartmentTaskInfo.completed}</td> }
          <td ><button  onClick={() => indidualInfoHandler(allDepartmentTaskInfo)} className="sm-btn">View</button></td>
          <td>    
            <select value={selectValue} onChange={(event) => handleEditClick(allDepartmentTaskInfo._id, event.target.value)}>
            <option value="To Do">Update Status</option>

            <option value="To Do">To Do</option>
            <option value="In progress">In progress</option>
            <option value="In Review"> In Review</option>
            <option value="Completed">Completed</option>
                </select></td> */}
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

export default ComplianceTable;
