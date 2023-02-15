import { Link, Route, Routes } from "react-router-dom";
import EmployeeInfo from "./EmployeeInfo/employeeInfo";

const PayRollTabs = ()  => {
    return (
        <div>
             <div className='Tabs '>

<ul className='d-flex justify-content-between'>
  <li><Link to="/employeeinfo" > Employee Information</Link></li>
  <li><Link to="/performance"> Performance</Link></li>
  <li><Link to="/leave"> Leave</Link></li>
  <li><Link to="/attendance"> Attendance</Link></li>
  <li><Link to="/payroll"> Payroll</Link></li>
  <li><Link to="/documents"> Documents</Link></li>
  <li><Link to="/notes"> Notes</Link></li>
  
</ul>
</div>


<Routes>
    <Route path="/employeeinfo"  element={<EmployeeInfo />}></Route>
</Routes>
        </div>
    )
}

export default PayRollTabs;