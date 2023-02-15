import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import SearchIcon from "../../../images/search.png";
import RecruitmentForm from "./RecruitmentForm";

const Recruitment = (props) => {
const navigate = useNavigate();


  const [activeClass, setActiveClass] = useState(false);
  const [allRecruitment, setAllRecruitment] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  

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
    
    axios.get("https://gtexterp.herokuapp.com/api/job/all", {
        headers : headers
    })
        .then(response => {
          setIsLoading(false);
            console.log(response.data.data);
            let recruitmentData = response.data.data;
             recruitmentData = recruitmentData.sort().reverse();
            setAllRecruitment([...recruitmentData]);
            // let objectData = response.data.data;
            // objectData = objectData.sort().reverse();

      let tableData;
              }) 
              .catch(err=> {
                  console.error(err)
              })
      }, [])


      const editHandler = (allRecruitmentInfo) => {
        console.log('allRecruitmentInfo', allRecruitmentInfo)
        navigate(allRecruitmentInfo._id);
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
          text: "Once deleted, you will not be able to recover this imaginary file!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            
        axios
        .delete(`https://gtexterp.herokuapp.com/api/job/delete?id=${id}`, config)
        .then((response) => {
          setIsLoading(false);
          toast.success('Job Deleted successfully');
          window.location.reload () 
          
        })
        .catch((err) => {
          setIsLoading(false);
          console.error(err.response);
          toast.error(err.response.data.message);
          
          console.log(err.response.data.message);
          //setErrorMsg(err.data.message)
        });
     
          } else {
            swal("Your imaginary file is safe!");
          }
        });
    
    
    
        // }
      }




  return (
    <>
      <div className="d-flex justify-content-between">
      <button className="sm-btn" onClick={toggleForm}>Add Job</button>
      <div className={`employeeform-container ${activeClass ? "show" : ""}`}>
        <div
          onClick={toggleForm}
          className={`employeeform-overlay ${activeClass ? "show" : ""}`}
        ></div>
        <div className={"employee-form"}>
          <RecruitmentForm toggleForm={toggleForm}
           />
        </div>
      </div>


      <button onClick={() => navigate(-1)} className="sm-btn">
          Back
        </button>





        <div className="search-input ">
          <input placeholder="Search Employee" />
          <img src={SearchIcon} alt="" />
        </div>
      </div>
      <div className="mt-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Description </th>
              <th>Location</th>
              <th>Edit</th>
              <th>Delete</th>
              {/* <th>Deadline</th>
              <th>Applicants</th> */}
            </tr>
          </thead>
          {isLoading && <div><LoadingSpinner /></div>}
          <tbody>

          {allRecruitment.map((allRecruitmentInfo, allRecruitmentInfoIndex) => (
            <tr key={allRecruitmentInfo._id} value={allRecruitmentInfo.id}>
              <td>{allRecruitmentInfo.job_title}</td>
              <td>{allRecruitmentInfo.description}</td>
              <td>{allRecruitmentInfo.location}</td>
              <td><button className="sm-btn" onClick={() => editHandler(allRecruitmentInfo)}>Edit</button></td>
              {/* <td><button className="sm-btn" onClick={() => props.editHandler(allRecruitmentInfo._id)}>Edit</button></td> */}
             <td><button className="sm-btn" onClick={() => deleteHandler(allRecruitmentInfo._id)}>Delete</button></td>
            </tr>
             ))}
           
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Recruitment;
