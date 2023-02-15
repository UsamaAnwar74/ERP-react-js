import React from "react";
import { Table } from "react-bootstrap";

const Vistor = () => {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>No. of Visitor</th>
            <th>Avg. Check-In</th>
            <th>Avg. Check-Out</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>07/11/2022</td>
            <td>68</td>
            <td>07: 45 AM</td>
            <td>06: 05 PM</td>
          </tr>
          <tr>
            <td>07/11/2022</td>
            <td>68</td>
            <td>07: 45 AM</td>
            <td>06: 05 PM</td>
          </tr>
          <tr>
            <td>07/11/2022</td>
            <td>68</td>
            <td>07: 45 AM</td>
            <td>06: 05 PM</td>
          </tr>
          <tr>
            <td>07/11/2022</td>
            <td>68</td>
            <td>07: 45 AM</td>
            <td>06: 05 PM</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Vistor;
