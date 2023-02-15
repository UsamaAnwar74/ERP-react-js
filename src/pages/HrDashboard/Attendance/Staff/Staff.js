import React from "react";
import { Table } from "react-bootstrap";

const Staff = () => {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Present</th>
            <th>Absent</th>
            <th>Avg. Check-In</th>
            <th>Avg. Check-Out</th>
            <th>Total Work Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>07/11/2022</td>
            <td>68</td>
            <td>3</td>
            <td>07: 45 AM</td>
            <td>06: 05 PM</td>
            <td>100h 20min</td>
          </tr>
          <tr>
            <td>07/11/2022</td>
            <td>68</td>
            <td>3</td>
            <td>07: 45 AM</td>
            <td>06: 05 PM</td>
            <td>100h 20min</td>
          </tr>
          <tr>
            <td>07/11/2022</td>
            <td>68</td>
            <td>3</td>
            <td>07: 45 AM</td>
            <td>06: 05 PM</td>
            <td>100h 20min</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Staff;
