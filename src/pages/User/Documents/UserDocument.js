import React from "react";
import { Table } from "react-bootstrap";

const UserDocument = () => {
  return (
    <div>
      <Table>
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
            <td>1,765.09 KB</td>
          </tr>
          <button className="sm-btn my-3">Upload File</button>
        </tbody>
      </Table>
    </div>
  );
};

export default UserDocument;
