import React from "react";
import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import formatDistance from 'date-fns/formatDistance';
import moment from 'moment';
import { Table } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import DesignationForm from "./DesignationForm";
import swal from "sweetalert";
import { toast } from "react-toastify";

import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";









const Designation = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [departments, setDepartments] = useState([]);
  const [activeClass, setActiveClass] = useState(false);
  const [designationInfos, setDesignationInfos] = useState([]);

  const toggleForm = () => {
    setActiveClass(!activeClass);
  };

  useEffect(() => {
    var token = localStorage.getItem("accessToken")
    console.log(token)
    if(!token) {
        navigate("/login");
    }

    const headers = {
        contentType : "application/json",
        Authorization : "Bearer " +  token
    }
    
    axios.get("https://gtexterp.herokuapp.com/api/branch/get", {
        headers : headers
    })
        .then(response => {
            console.log(response.data.data)
            let designationData = response.data.data
            designationData = designationData.sort().reverse();
            setDesignationInfos([...designationData]);
            let objectData = response.data.data;
            objectData = objectData.sort().reverse();


          


//       let tableData;
//       objectData.map((value, index) => {
//         // const formatDate = Moment().format(value.createdAt,'MMM Do YYYY').isValid();
//         const dateStr = value.createdAt;
//         const str = formatDistance(
//             new Date(dateStr),
//             new Date()
//         );
//         // return <h1>{str}</h1>
//         // console.log(value.location);
//          tableData+= `
        
//          <tr key=${index} value=${value.id}>
       
//       <td>1</td>
//       <td>${value.location}</td>
//       <td>${str}</td>
    
//     </tr>
// `
// })
// document.getElementById("table_body")
// .innerHTML=tableData;
              }) 
              .catch(err=> {
                  console.error(err)
              })
      }, [])

      async function editHandler(id){
        setActiveClass(!activeClass);
        
      }

      async function deleteHandler (id) {
        setIsLoading(true);
    
        
        var organization = localStorage.getItem("organization");
    
    
        var token = localStorage.getItem("accessToken");
    
        const config = {
          headers: {
            contentType: "application/json",
            Authorization: "Bearer " + token,
          },
        };
    
    
        swal({
          title: "Are you sure?",
          text: "Once deleted, You will not be able to recover this Branch",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            
        axios
        .delete(`https://gtexterp.herokuapp.com/api/branch/delete?id=${id}`, config)
        .then((response) => {
          setIsLoading(false);
    
          // console.log(response);
        //  console.log(response.data, "the money is nigeria");
          toast.success('Branch Deleted successfully');
          navigate(-1);
        })
        .catch((err) => {
          console.error(err.response);
          toast.error(err.response.data.message);
          setIsLoading(false);
          console.log(err.response.data.message);
          //setErrorMsg(err.data.message)
        });
     
          } else {
            swal("Your Branch is safe!");
            setIsLoading(false);
          }
        });
    
    
    
        // }
      }



  return (
    <div>
      <button className="sm-btn" onClick={toggleForm}>Add Branch</button>
      <div className={`employeeform-container ${activeClass ? "show" : ""}`}>
        <div
          onClick={toggleForm}
          className={`employeeform-overlay ${activeClass ? "show" : ""}`}
        ></div>
        <div className={"employee-form"}>
          <DesignationForm toggleForm={toggleForm}
           />
        </div>
      </div>


      <div className="back d-flex">
<button onClick={() => navigate(-1)} className="sm-btn">
          Back
        </button>
</div>


      <div className="" style={{ margin: "30px 0px" }}>
        <Table striped bordered hover>
        <thead>
        <tr>
          {/* <th>#</th> */}
          <th>Location</th>
          <th>Created At </th>
          <th>Edit</th>
          <th>Delete</th>
        
        </tr>
      </thead>
      {isLoading && <div><LoadingSpinner /></div>}
      <tbody>
        {designationInfos.map((designationInfo, designationInfoIndex) => (
          <tr key={designationInfo._id} value={designationInfo.id}>
       
       {/* <td>1</td> */}
       <td>{designationInfo.location}</td>
       <td>{moment(designationInfo.createdAt).format('LLLL')}</td>
       <td><button className="sm-btn"onClick={() => editHandler(designationInfo._id)}>Edit</button></td>
       <td><button className="sm-btn" onClick={() => deleteHandler(designationInfo._id)}>Delete</button></td>

     
     </tr>
        ))}
      
      </tbody>
      {/* <tbody id='table_body' /> */}
    
        </Table>
      </div>
    </div>
  );
};

export default Designation;
