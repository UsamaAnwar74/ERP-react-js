import React from "react";
import { useEffect,  } from "react";
import {  useParams, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import axios from "axios";
import SearchIcon from "../../../images/search.png";

const Documents = () => {

  const params = useParams();
  const navigate = useNavigate();
  console.log(params, "vim");

 




  return (
    <div>
      <div className="search-input">
        <input placeholder="Search Employee" />
        <img src={SearchIcon} alt="" />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>File</th>
            <th>Modified</th>
            <th>Created by</th>
            <th>File Size</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Certificate</td>
            <td>09-07-2022 12:20 PM</td>
            <td>hr@gtextholdings.com</td>
            <td>1,765.09</td>
          </tr>
          <tr>
            <td>Certificate</td>
            <td>09-07-2022 12:20 PM</td>
            <td>hr@gtextholdings.com</td>
            <td>1,765.09</td>
          </tr>
        </tbody>
      </Table>
      <button className="sm-btn">Upload File</button>
    </div>
  );
};

export default Documents;
