import Table from 'react-bootstrap/Table';

import './leave.css';



function StripedRowExample() {
  return (
    <Table striped>
      <thead className='tablehead'>
        <tr>
          <th>#</th>
          <th>Employee </th>
          <th>From</th>
          <th>To </th>
          <th>Duration </th>
          <th>Status</th>
          <th>Approved by</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Anold Alexander</td>
          <td>07/07/2022</td>
          <td>09/07/2022</td>
          <td>3 Days</td>
          <td> <div className='d-flex align-items-center'><div className='scontain'></div><div>Completed</div></div></td>
          <td>Johnson Alabi</td>
          <td><button className='btn1'>Approved</button></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Anold Alexander</td>
          <td>07/07/2022</td>
          <td>09/07/2022</td>
          <td>3 Days</td>
          <td> <div className='d-flex align-items-center'><div className='scontain'></div><div>Completed</div></div></td>
          <td>Johnson Alabi</td>
          <td><button className='btn1'>Approved</button></td>
        </tr>
        <tr>
          <td>3</td>
          <td>Anold Alexander</td>
          <td>07/07/2022</td>
          <td>09/07/2022</td>
          <td>3 Days</td>
          <td> <div className='d-flex align-items-center'><div className='scontain'></div><div>Completed</div></div></td>
          <td>Johnson Alabi</td>
          <td><button className='btn1'>Approved</button></td>
        </tr>
      </tbody>
    </Table>
  );
}

export default StripedRowExample;