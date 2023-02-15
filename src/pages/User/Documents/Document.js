import React , { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import moment from 'moment';
import {  Link, useNavigate, useParams } from "react-router-dom";

import DocumentFileUploadForm from "./DocumentFileUpload";
import DocumentFileUpload from "./DocumentFileUpload";

const Document = () => {
  const [activeClass, setActiveClass] = useState(false);
  const [documentInfos, setDocumentInfos] = useState([]);

  const navigate = useNavigate();
  const params = useParams();

  console.log(params, " vim");


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
    
    axios.get(`https://gtexterp.herokuapp.com/api/document/get?id=${params.userid}`, {
        headers : headers
    })
        .then(response => {
           // console.log(response.data.data)

            let documentData = response.data.data
             let documentURL = response.data.data.document_url;
            documentData = documentData.sort().reverse();
            setDocumentInfos([...documentData]);
           console.log(response, "Testing")

            console.log(documentData, "Test")
            // let objectData = response.data.data;
            // objectData = objectData.sort().reverse();
              }) 
              .catch(err=> {
                  console.error(err)
              })
      }, [])



  return (
    <div>
      <Table>
        <thead>
          <tr>
            {/* <th>File</th> */}
            <th>Document Type</th>
            <th>Created at</th>
            <th>Document Url</th>
          </tr>
        </thead>
        <tbody>
          {documentInfos.map((documentInfo, setDocumentInfoIndex) => (
             <tr key={documentInfo._id}  value={documentInfo.id}>
             {/* <td>Certificate</td> */}
             
             <td>{documentInfo.document_type}</td>
             <td>{moment(documentInfo.createdAt).format('LLLL')}</td>
             <td><a href={documentInfo.document_url}>{documentInfo.document_url}</a></td>
           </tr>
          ))}
         
          <button className="sm-btn my-3" onClick={toggleForm}>Upload File</button>
          <div className={`employeeform-container ${activeClass ? "show" : ""}`}>
        <div
          onClick={toggleForm}
          className={`employeeform-overlay ${activeClass ? "show" : ""}`}
        ></div>
        <div className={"employee-form"}>
          <DocumentFileUploadForm toggleForm={toggleForm}
           />
        </div>
      </div>
        </tbody>
      </Table>
    </div>
  );
};

export default Document;
