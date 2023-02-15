import Table from 'react-bootstrap/Table';
import "./payroll.css";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import PayRollIndividualInfo from './payrollIndividualInfo';




function StripedRowExample() {
    const navigate = useNavigate();


function individualInformationHandler(event) {
    event.preventDefault();
    navigate('/payrollIndividualInfo')
}



  return (
    <div>
    <Table striped>
      <thead className='tablehead'>
        <tr>
          <th>#</th>
          <th>Employee Name</th>
          <th>Department </th>
          <th>Designation</th>
          <th>Employment Type</th>
          <th>Total Payment</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td ><Link to="/payrollIndividualInfo">Mark</Link></td>
          <td>SID</td>
          <td>Designer</td>
          <td>Full time</td>
          <td>100,000</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Adeniyi Akala</td>
          <td>SID</td>
          <td>Designer</td>
          <td>Full time</td>
          <td>150,000</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Adeniyi Akala</td>
          <td>SID</td>
          <td>Designer</td>
          <td>Full time</td>
          <td>100,000</td>
        </tr>
      </tbody>
    </Table>

 
    </div>
  );
}

export default StripedRowExample;