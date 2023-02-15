import React from "react";
import { Table } from "react-bootstrap";

const Leave = () => {
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Description</th>
            <th>From</th>
            <th>To</th>
            <th>Duration</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10/10/2022</td>
            <td>05/10/2022</td>
            <td>09/07/2022 </td>
            <td>3 Days</td>
            <td>Completed</td>
          </tr>
          <button className="sm-btn">Add Leave</button>
        </tbody>
      </Table>
    </div>
  );
};

export default Leave;
