import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import moment from "moment";
import { toast } from "react-toastify";
import AdminForm from "./AdminForm";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";





const AdminTable = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [taskInfos, setTaskInfos] = useState({});
    const [allProducts, setAllProducts] = useState([]);
    const [allAdminIssue, setAllAdminIssue] = useState([]);
    const [allDepartmentTask, setAllDepartmentTask] = useState([]);
    const [individualDepartmentTask, setIndividualDepartmentTask] = useState([]);
    const [compliance, setCompliance] = useState([])
    const [activeClass, setActiveClass] = useState(false);
    const [activeClass2, setActiveClass2] = useState(false);
    const [user, setUser] = useState({
      status: "",
    });

    const [selectValue, setValue] = useState("");
    const departmentIdType = localStorage.getItem("department");
    console.log(departmentIdType, "cfgdgf");

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


    function handleEditClick (id, update){
      setIsLoading(true); 


var token = localStorage.getItem("accessToken");

const data = {
 status: update
}

const config = {
  headers: {
    contentType: "application/json",
    Authorization: "Bearer " + token,
  },
};


axios
  .put(`https://gtexterp.herokuapp.com/api/admin/update?id=${id}`, data, config)
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

      //   axios.get(`https://gtexterp.herokuapp.com/api/department/one?id=${departmentIdType}`, {
      //     headers : headers
      // })
      //     .then(response => {
      //       setIsLoading(false);
      //       console.log("ggggggg");
      //         console.log(response.data.data, "not me")
      //         let productData = response.data.data
            
    
     
      //           }) 
      //           .catch(err=> {
      //               console.error(err)
      //           })
       


  

        
        axios.get(`https://gtexterp.herokuapp.com/api/admin/get`, {
            headers : headers
        })
            .then(response => {
              setIsLoading(false);
                console.log(response.data.data, "yessssssssssssssssss")
                let productData = response.data.data
                setAllAdminIssue([...productData]);
      
       
                  }) 
                  .catch(err=> {
                      console.error(err)
                  });


                }, []);
      


      

    

return (
  <div className="container-fluid p-5">
       <div className="d-flex justify-content-end ps-4 pe-4">
    
      <button onClick={() => navigate(-1)} className="sm-btn">
          Back
        </button>
       </div>


       
    <div>
    <button className="sm-btn" onClick={toggleForm}>Create Issue</button>
      <div className={`employeeform-container ${activeClass ? "show" : ""}`}>
        <div
          onClick={toggleForm}
          className={`employeeform-overlay ${activeClass ? "show" : ""}`}
        ></div>
        <div className={"employee-form"}>
          <AdminForm toggleForm={toggleForm}
           />
        </div>
      </div>


 



  
      <div className="" style={{ margin: "30px 0px" }}>
        <Table striped bordered hover>
        <thead>
        <tr>
          
          <th>Title</th>
          <th>Description</th>
          <th>Type</th>
          <th>Status</th>
          <th>Action</th>

          {/* <th>Edit</th> */}
          {/* <th>Delete</th> */}
        
        </tr>
      </thead>
      {isLoading === true && <div><LoadingSpinner /></div>}
      <tbody className="text-center">
      {allAdminIssue.map((allAdminIssueInfo, allAdminIssueInfoIndex) => (
          <tr  key={allAdminIssueInfo._id} value={allAdminIssueInfo.id}>
       
          
          <td>{allAdminIssueInfo.title}</td>
          <td>{allAdminIssueInfo.description}</td>
          <td>{allAdminIssueInfo.type}</td>
          {/* <td>{moment(allDepartmentTaskInfo.dueDate).format('LLLL')}</td> */}
         {  allAdminIssueInfo.status === 'New Request' ?  <td class="badge rounded-pill  text-white mt-2  bg-danger" >{allAdminIssueInfo.status}</td>: allAdminIssueInfo.status === 'On Going' ? <td class="badge rounded-pill  mt-2  bg-warning text-dark" >{allAdminIssueInfo.status}</td>
          // :  allAdminIssueInfo.status === 'In Review' ? <td class="badge rounded-pill  text-white mt-2  bg-primary" >{allAdminIssueInfo.status}</td>
           : <td class="badge rounded-pill  text-white mt-2  bg-success" >{allAdminIssueInfo.status}</td> }
          {/* <td ><button  onClick={() => indidualInfoHandler(allAdminIssue)} className="sm-btn">View</button></td> */}
          <td>    
            <select value={selectValue} onChange={(event) => handleEditClick(allAdminIssueInfo._id, event.target.value)}>
          
             <option value="Update Status">Update Status</option>
            <option value="New Request">New Request</option>
            <option value="On Going">On Going</option>
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

export default AdminTable;
