import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import Appbar from "../appbar/appbar";
import Leave from "./leave/leave";
import OverView from "./overview/overview";
import PayRoll from "./payroll/payroll";
import People from "./people/people";
import "./humanResourceDashboard.css";

import "./humanResourceDashboard.css";
import Recruitment from "./recruitment/recruitment";
import Attendance from "./attendance/attendance";
import Documents from "./documents/documents";
import Training from "./training/training";
import Reports from "./reports/reports";
import Announcements from "./announcements/announcements";
import PayRollIndividualInfo from "./payroll/payrollIndividualInfo";

const HumanResourcesDashboard = () => {
  // return (
  //   <div>
  //     <Outlet />
  //      <div className="Tabs ">
  //       <ul className="d-flex justify-content-between">
  //         <li>
  //           <Link to="/overview"> Overview</Link>
  //         </li>
  //         <li>
  //           <Link to="/people"> People</Link>
  //         </li>
  //         <li>
  //           <Link to="/payroll"> Payroll</Link>
  //         </li>
  //         <li>
  //           <Link to="/leave"> Leave</Link>
  //         </li>
  //         <li>
  //           <Link to="/recruitment"> Recruitment</Link>
  //         </li>
  //         <li>
  //           <Link to="/attendance"> Attendance</Link>
  //         </li>
  //         <li>
  //           <Link to="/documents"> Documents</Link>
  //         </li>
  //         <li>
  //           <Link to="/training"> Training</Link>
  //         </li>
  //         <li>
  //           <Link to="/reports"> Reports</Link>
  //         </li>
  //         <li>
  //           <Link to="/announcements"> Announcements</Link>
  //         </li>
  //       </ul>

  return (
    <div className="HumanResourcesDashboard">
      <Appbar />
      <div className="Tabs ">
        <ul className="d-flex justify-content-between">
          <li>
            <Link to="/overview"> Overview</Link>
          </li>
          <li>
            <Link to="/people"> People</Link>
          </li>
          <li>
            <Link to="/payroll"> Payroll</Link>
          </li>
          <li>
            <Link to="/leave"> Leave</Link>
          </li>
          <li>
            <Link to="/recruitment"> Recruitment</Link>
          </li>
          <li>
            <Link to="/attendance"> Attendance</Link>
          </li>
          <li>
            <Link to="/documents"> Documents</Link>
          </li>
          <li>
            <Link to="/training"> Training</Link>
          </li>
          <li>
            <Link to="/reports"> Reports</Link>
          </li>
          <li>
            <Link to="/announcements"> Announcements</Link>
          </li>
        </ul>

        <Routes>
          <Route path="/overview" element={<OverView />}></Route>
          <Route path="/people" element={<People />}></Route>
          <Route path="/payroll" element={<PayRoll />}></Route>
          <Route
            path="/payrollIndividualInfo"
            element={<PayRollIndividualInfo />}
          ></Route>
          <Route path="/leave" element={<Leave />}></Route>
          <Route path="/recruitment" element={<Recruitment />}></Route>
          <Route path="/attendance" element={<Attendance />}></Route>
          <Route path="/documents" element={<Documents />}></Route>
          <Route path="/training" element={<Training />}></Route>
          <Route path="/reports" element={<Reports />}></Route>
          <Route path="/announcements" element={<Announcements />}></Route>
          <Route path="/*" element={<PayRollIndividualInfo />}></Route>
          <Route
            path="/payrollIndividualInfo"
            element={<PayRollIndividualInfo />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
};

export default HumanResourcesDashboard;
