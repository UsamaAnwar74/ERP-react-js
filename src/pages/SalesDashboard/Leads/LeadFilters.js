// import styles from "./DataTable.module.scss";
import React from "react";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LeadFilters =  ({departments, LeadsReload}) => { 

    const [isLoading, setIsLoading] = useState(false);
    const [productId, setProductId] = useState("");
    const [searchBy, setsearchBy] = useState("");

    
 

    const FilterByStaff = () => {

    }
    const setFilteredData = (e) => {
        setsearchBy(e)
    }
    var token = localStorage.getItem("accessToken");

    const config = {
        headers: {
          contentType: "application/json",
          Authorization: "Bearer " + token,
        },
    };

    const setLeadbyStaff = (e) => {

        axios.get(`https://gtexterp.herokuapp.com/api/lead/get?id=`+e, config)
        .then(response => {
               //   console.log(response, "check11")

            setIsLoading(false);
        let allLeadData = response.data.data
        LeadsReload(allLeadData);
        
                
        })
        .catch(err=> {
            console.error(err)
        })
    }
    useEffect(() => {

        
    },[]);

   
    return (
        <div>
            <table className="table" id="example">
                <tr>
                <td>Search by agent:</td>
                    <td>
                    
                    <select
                        style={{}}
                        className="input-field form-control"
                        // value={props.departments}
                        onChange={(e) => {
                        setLeadbyStaff(e.target.value);
                  
                        }}
                    >
                        <option value="default" className="input-field">
                        Choose Product
                        </option>
                        {departments && Array.isArray(departments)
                        ? departments.map((department) => {
                           // console.log("depir", department);
                          // console.log("hello", departments);

                            return (
                                <option key={department._id} value={department._id}>
                                {department.first_name}
                                
                                </option>
                            );
                            })
                        : null}
                    </select>
                    
                    </td>
                    <td>Search: </td>
                    <td>
                        <div className='search'>
                            <span className='searchLabel'></span>
                            <input
                            className='input-field form-control'
                            type="text"
                            onChange={(e) => setFilteredData(e.target.value)}
                            />

                        </div>
                    </td>
                    <td>
                    <button className="sm-btn" onClick={FilterByStaff}> Search </button>

                    </td>
                    <td>

                        </td>
                </tr>
            </table>
        </div>
 )
}

export default LeadFilters; 
