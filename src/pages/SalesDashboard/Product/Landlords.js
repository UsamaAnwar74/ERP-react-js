import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import moment from "moment";
import { toast } from "react-toastify"
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import CrmForm from "./landlordform";
import Landlordform from "./landlordform";





const Landlords = () => {
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
        
        axios.get(`https://gtexterp.herokuapp.com/api/landlord/all`, {
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


          function handleEditClick (id, status){
            setIsLoading(true); 
 
  
      var token = localStorage.getItem("accessToken");
      
      const data = {
       status: status
      }
  
      const config = {
        headers: {
          contentType: "application/json",
          Authorization: "Bearer " + token,
        },
      };
  
     
      axios
        .put(`https://gtexterp.herokuapp.com/api/landlord/update?id=${id}`, data, config)
        .then((response) => {
          setIsLoading(false);
          console.log(response, "on God");
                 
          toast.success('Task status details has been updated');
          window.location.reload(); 
 
        })
        .catch((err) => {
          console.error(err);
          toast.error(err.response.data.message);
          setIsLoading(false);
          console.log(err.response.data.message);
          //setErrorMsg(err.data.message)
        });
  
      // }
           }


      

    

return (
  <div className="container-fluid p-5">
       <div className="d-flex justify-content-end ps-4 pe-4">
    
      <button onClick={() => navigate(-1)} className="sm-btn">
          Back
        </button>
       </div>


       
    <div>
    <button className="sm-btn" onClick={toggleForm}>Create Landlord</button>
      <div className={`employeeform-container ${activeClass ? "show" : ""}`}>
        <div
          onClick={toggleForm}
          className={`employeeform-overlay ${activeClass ? "show" : ""}`}
        ></div>
        <div className={"employee-form"}>
          <Landlordform toggleForm={toggleForm}
           />
        </div>
      </div>


 



  
      <div className="" style={{ margin: "30px 0px" }}>
        <Table striped bordered hover>
        <thead>
        <tr>
          
          <th>Title</th>
          <th>Description</th>
          <th>Landlords Name</th>
          <th>Landlords Location</th>
          <th>Landlords Phone Number</th>
          <th> Landlords Email</th>
          <th>Agent</th>

          <th>Type</th>
          <th>Status</th>
          <th>Action</th>

          {/* <th>Edit</th> */}
          {/* <th>Delete</th> */}
        
        </tr>
      </thead>
      {isLoading === true && <div><LoadingSpinner /></div>}
      <tbody className="text-center">
      {allProducts.map((allProductInfo, allProductInfoIndex) => (
          <tr  key={allProductInfo._id} value={allProductInfo.id}>
       
          
          <td>{allProductInfo.title}</td>
          <td>{allProductInfo.description}</td>
          <td>{allProductInfo.customer_name}</td>
          <td>{allProductInfo.customer_location}</td>
          <td>{allProductInfo.customer_phone_number}</td>
          <td>{allProductInfo.customer_email}</td>
          <td>{allProductInfo.assigned_to_name}</td>

          <td>{allProductInfo.type}</td>
          {/* <td>{moment(allDepartmentTaskInfo.dueDate).format('LLLL')}</td> */}
         {  allProductInfo.status === 'Pending' ?  <td class="badge rounded-pill  text-white mt-2  bg-danger" >{allProductInfo.status}</td>: allProductInfo.status === 'Attending' ? <td class="badge rounded-pill  mt-2  bg-warning text-dark" >{allProductInfo.status}</td> 
        //  :  allProductInfo.status === 'In Review' ? <td class="badge rounded-pill  text-white mt-2  bg-primary" >{allProductInfo.status}</td> 
         : <td class="badge rounded-pill  text-white mt-2  bg-success" >{allProductInfo.status}</td> }
          
          <td>    
            <select value={selectValue} onChange={(event) => handleEditClick(allProductInfo._id, event.target.value)}>
            <option value="To Do">Update Status</option>

            <option value="Pending">Pending</option>
            <option value="Attending">Attending</option>
            <option value="Close"> Close</option>
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

export default Landlords;
