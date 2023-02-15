/* eslint-disable no-lone-blocks */
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Table } from "react-bootstrap";
import moment from "moment";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import LeadsForm from "./LeadsForm";
import UpdateLead from "./UpdateLead"
import LeadFilters from "./LeadFilters";
import Expanded from "./Expanded";
import Modal from 'react-modal';
import DataTable from 'react-data-table-component';



//  const columns = [
  // {
  //     name: 'Client fullName',
  //     selector: row => row.fullname,
  //     sortable: true,

  // },
  // {
  //     name: 'Client Email',
  //     selector: row => row.email,
  //     sortable: true,

  // },
  // {
  //     name: 'Client Phone',
  //     selector: row => row.phone,
  //     render: function (data, type, full, meta) {
  //         return '<a href={"mailto:"+allLeadTaskInfo.phone}>' + meta.phone + "</a>";
  //     },
  // },
  // {
  //   name: 'Client Location',
  //   selector: row => row.location,
  // },
  // {
  //   name: 'Payment Type',
  //   selector: row => row.payment_type,
  // },
  // {
  //   name: 'Status',
     
  //   selector: row => row.status,
    
  //  sortable: true,
   
  
  // },
  // {
  //   name: 'Sales Agent',
   
  //   selector: row => row.sale_agent_name,  
  //   sortable: true,
  //   cell: (Row) =>(
  //     <select
  //     onChange={(e) => {
  //   //  setLeadbyStaff(e.target.value);

  //     }}
  // >
  //     <option value="default" className="input-field">
  //     Choose agent
  //     </option>
  //     {/* {departments && Array.isArray(departments)
  //     ? departments.map((department) => {
  //         // console.log("department", department);

  //         return (
  //             <option key={department._id} value={department._id}>
  //             {department.first_name}
  //             </option>
  //         );
  //         })
  //     : null} */}
  // </select>




  //    ),
 // },
//   {
//     name: 'Action',
//     button: true,
//     cell: (Row) =>(
//         <div>
      
//         <select value={Row.selectValue} onChange={(event) => Row.handleClick(Row._id, event.target.value)}>

//             <option value="To Do">Update Lead</option>
//             <option value="Fresh Lead">Fresh Lead
//             </option>
//             <option value="In progress">In progress</option>
//             <option value="Completed">Closed</option>
           
//         </select>
        
//        </div>)
       
    
//   },

// ];


const Leads = ({departments, LeadsReload}) => {


    const [isLoading, setIsLoading] = useState(false);
    const [taskInfos, setTaskInfos] = useState({});
    const [allLeadTask, setAllLeadTask] = useState([])
    const [allDepartmentTask, setAllDepartmentTask] = useState([]);
    const [individualDepartmentTask, setIndividualDepartmentTask] = useState([]);
    const [activeClass, setActiveClass] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [activeClass2, setActiveClass2] = useState(false);
    const [user, setUser] = useState({
      status: "",
    });
    
    const ExpandedComponent = ( data ) => <Expanded data={data} />;
    // const ExpandedComponent = ( { data } ) => <pre>{}</pre>;

    
    const [DepartmentInfo, setDepartmentInfo] = useState([]);

    const [selectValue, setValue] = useState("");

    const navigate = useNavigate();

    const paramsId = useParams();
    console.log("paramid", paramsId.staffId);

    const userid = localStorage.getItem('_id');
    const department = localStorage.getItem('department');
    console.log(userid, " userid d rock");
    console.log(department, "d boss ");
    
    const getdepartmentURL = `https://gtexterp.herokuapp.com/api/staff/by_depaftment?id=${department}`;
      

    //const isHOD = localStorage.getItem("isHOD");
    const isHOD = true;
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
    const toggleForm2 = () => {
      setActiveClass2(!activeClass2);
    };
    
    const getDepartment = () => {
      var token = localStorage.getItem("accessToken");

    const config = {
      headers: {
        contentType: "application/json",
        Authorization: "Bearer " + token,
      },
    };

    axios.get(getdepartmentURL, config).then((response) => {
      console.log(response);
      console.log("department", response.data.data);
      let departmentData = response.data.data;
      setDepartmentInfo([...departmentData]);
     // console.log(setDepartmentInfo([...departmentData]));
     // console.log(departmentData, "Usamaaa");
    })
    .catch((err) => {
      console.error(err.response);
    });   
  }
 
      useEffect(() => {
        setIsLoading(true)
        getDepartment()
        var token = localStorage.getItem("accessToken")
        console.log(token)
        if(!token) {
            navigate("/login");
        }
      
        const headers = {
            contentType : "application/json",
            Authorization : "Bearer " +  token
        }

        {isHOD == true ? 
                
        axios.get(`https://gtexterp.herokuapp.com/api/lead/all`, {
            headers : headers
        })
            .then(response => {
              setIsLoading(false);
                let allLeadData = response.data.data
                setAllLeadTask([...allLeadData]);
               // console.log(allLeadData,"ali")
                  }) 
                  .catch(err=> {
                      console.error(err)
                  })

                  :

                  axios.get(`https://gtexterp.herokuapp.com/api/lead/get`, {
                    headers : headers
                })
                    .then(response => {
                      setIsLoading(false);
                        let individualLeadData = response.data.data
                        setAllLeadTask([...individualLeadData]);
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
          const setLeadbyStaff = (e) => {

            // console.log("usama " ,e);
            axios.get(`https://gtexterp.herokuapp.com/api/lead/get?id=`+e, config)
            .then(response => {
                setIsLoading(false);
            let allLeadData = response.data.data
                console.log("allLeadData:", allLeadData);
                    LeadsReload(allLeadData);
            })
            .catch(err=> {
                console.error(err)
            })
        }
        useEffect(() => {
    
            
        },[]);
    
    const LeadsProp = (e) => {
      setAllLeadTask(e);
    }

    function handleEditClick (id, update){
            setIsLoading(true); 
           // console.log(id, "IT")

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
        .put(`https://gtexterp.herokuapp.com/api/lead/change_status?id=${id}`, data, config)
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
          //console.log(allLeadTask, "Usamaaa");
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
    <button className="sm-btn" onClick={toggleForm}>Create Lead</button>
      <div className={`employeeform-container ${activeClass ? "show" : ""}`}>
        <div
          onClick={toggleForm}
          className={`employeeform-overlay ${activeClass ? "show" : ""}`}
        ></div>
        <div className={"employee-form"}>
          <LeadsForm toggleForm={toggleForm}
           />
        </div>
      </div>

      <LeadFilters LeadsReload={LeadsProp} departments={DepartmentInfo} />
     


      <div className="" style={{ margin: "30px 0px" }}>


      <Table  id="example" striped bordered hover >

        
        <thead>
       
        <tr>
        
      
          <th>Client fullName</th>
          <th>Client Email</th>
          <th>Client Phone</th>
          <th>Client Location</th>
          <th>Payment Type</th>
          {/* <th> Landlords Email</th> */}
          {/* <th>Agent</th> */}

          {/* <th>Type</th> */}
          <th>Status</th>
          <th>Action</th>

          {/* <th>Edit</th> */}
          {/* <th>Delete</th> */}
          <th>


</th>
        </tr>
      </thead>
      {isLoading === true && <div><LoadingSpinner /></div>}
      <tbody className="text-center">
      {allLeadTask.map((DepartmentInfo, departmentIndex) => (
          <tr  key={DepartmentInfo._id} value={DepartmentInfo.id}>
       {/* <DataTable
            //columns={columns}
            data={allLeadTask}
            selectableRows ={true}
            expandableRows={true}
          handleClick={handleEditClick}
            expandableRowsComponent={ExpandedComponent}
            pagination
        /> */}
    


          
          <td>{DepartmentInfo.fullname}
          
          </td>
          <td>{  DepartmentInfo.email}</td>
          <td>{DepartmentInfo.phone}

      
          </td>
          <td>{DepartmentInfo.location}</td>
          <td>{DepartmentInfo.payment_type}</td>
          {/* <td>{allLeadTask.email}</td> */}
          {/* <td>
          <select 
                      style={{}}
                        className="input-field form-control"
                       
                        onChange={(e) => {
                          setDepartmentInfo(e.target.value);
                  
                        }}
                    >
                    <option value="default" className="input-field">
                        Choose agent
                        </option>
                        {DepartmentInfo && Array.isArray(DepartmentInfo)
                        ? DepartmentInfo.map((department) => {
                             console.log("dep", department);

                            return (
                                <option key={department._id} value={department._id}>
                                {department.first_name}
                                </option>
                            );
                            })
                        : null}


                  </select>
          
          </td> */}
{/* 
          <td>{DepartmentInfo.type}</td> */}
          {/* <td>{moment(allDepartmentTaskInfo.dueDate).format('LLLL')}</td> */}
         {  DepartmentInfo.status === 'Pending' ?  <td class="badge rounded-pill  text-white mt-2  bg-danger" >{DepartmentInfo.status}</td>: DepartmentInfo.status === 'Attending' ? <td class="badge rounded-pill  mt-2  bg-warning text-dark" >{DepartmentInfo.status}</td> 
        //  :  allProductInfo.status === 'In Review' ? <td class="badge rounded-DepartmentInfo  text-white mt-2  bg-primary" >{allProductInfo.status}</td> 
         : <td class="badge rounded-pill  text-white mt-2  bg-success" >{DepartmentInfo.status}</td> }
          
          <td>    
            <select value={selectValue} onChange={(event) => handleEditClick(DepartmentInfo._id, event.target.value)}>
            <option value="To Do">Update Status</option>

            <option value="Pending">Pending</option>
            <option value="Attending">Attending</option>
            <option value="Close"> Close</option>
                </select></td>

                <td> 


          <div>
            <button className="sm-btn" onChange={(event) => handleEditClick(DepartmentInfo._id, event.target.value)}
            onClick={toggleForm2 }   
           >Update</button>
              <div className={`employeeform-container ${activeClass2 ? "show" : ""}`}>
              <div
            onClick={toggleForm2}
            className={`employeeform-overlay ${activeClass2 ? "show" : ""}`}
            ></div>
              <div className={"employee-form"}>
            <UpdateLead toggleForm2={toggleForm2}
            />
        </div>
      </div>
      
      </div>
             
         </td>
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

export default Leads;
