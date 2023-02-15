import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/auth";
import RequireAuth from "./utils/requireAuth";
import Home from "./pages/Home";
import Login from "./Unauthenticated/Login";
import HrDashboard from "./pages/HrDashboard/HrDashboard";
import OverView from "./pages/HrDashboard/OverView/OverView";
import Error from "./components/Error";
import People from "./pages/HrDashboard/People/People";
import Employee from "./pages/HrDashboard/People/Employee/Employee";
import Department from "./pages/HrDashboard/People/Department/Department";
import Designation from "./pages/HrDashboard/People/Designation/Designation";
import Payroll from "./pages/HrDashboard/Payroll/Payroll";
import UserPayroll from "./pages/User/Payroll/UserPayroll";

import EmployeeDetails from "./pages/User/UserDetails";
import EmployeeInfo from "./pages/User/EmployeeInfo/EmployeeInfo";

import EmployeeInfoStaffOnly from "./pages/User/EmployeeInfo/EmployeeInfoStaffOnly";
import EmployeeDetailsStaffOnly from "./pages/User/UserDetailsStaffOnly";

import Performance from "./pages/User/Performance/Performance";
import Leave from "./pages/User/Leave/Leave";
import Attendance from "./pages/User/Attendance/Attendance";
import Document from "./pages/User/Documents/Document";
import Notes from "./pages/User/Notes/Notes";
import UserPerformance from "./pages/User/Leave/UserLeave";

import UserLeave from "./pages/User/Leave/UserLeave";
import UserAttendance from "./pages/User/Attendance/UserAttendance";
import UserDocument from "./pages/User/Documents/UserDocument";
import UserNotes from "./pages/User/Notes/UserNotes";
import EmployeeId from "./pages/HrDashboard/People/Employee/EmployeeId";
import Documents from "./pages/HrDashboard/Documents/Documents";
import All from "./pages/HrDashboard/Leave/All/All";
import Pending from "./pages/HrDashboard/Leave/Pending/Pending";
import Ongoing from "./pages/HrDashboard/Leave/Ongoing/Ongoing";
import Completed from "./pages/HrDashboard/Leave/Completed/Completed";
import Declined from "./pages/HrDashboard/Leave/Declined/Declined";
import Recruitment from "./pages/HrDashboard/Recruitment/Recruitment";
import Staff from "./pages/HrDashboard/Attendance/Staff/Staff";
import Vistor from "./pages/HrDashboard/Attendance/Vistor/Vistor";
import Training from "./pages/HrDashboard/Training/Training";
import Reports from "./pages//HrDashboard/Reports/Reports";
import Announcements from "./pages/HrDashboard/Announcements/Announcements";
import ClockingSystem from "./pages/ClockingSystem/ClockingSystem";
import Clocking from "./pages/ClockingSystem/Clocking";
import {Helmet} from "react-helmet";
import StaffDashboard from "./pages/StaffDashboard/Staff";
import Accounting from "./pages/StaffDashboard/Accounting";
import HumanResource from "./pages/StaffDashboard/HumanResource";
import Media from "./pages/StaffDashboard/Media";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StaffId from "./pages/StaffDashboard/index";
import IndividualStaffId from "./pages/StaffDashboard/individualStaffId";
import SalesDashboard from "./pages/SalesDashboard";
import Leads from "./pages/SalesDashboard/Leads/Leads";
import Product from "./pages/SalesDashboard/Product/Product";
import CrmDashboard from "./pages/CrmDashboard.js/CrmDashboard";
import ComplianceDashboard from "./pages/ComplanceDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import RecruitmentTabs from "./pages/HrDashboard/Recruitment";
import RecruitmentTabsId from "./pages/HrDashboard/Recruitment/EditRecruitment";

import IndividualProductId from "./pages/SalesDashboard/Product/IndividualProductId";
import Expenses from "./pages/Account/Expensesdashs";
import Income from "./pages/Income/Income";
import Maindash from "./pages/Account/Maindash";
import ClockingDashboard from "./pages/ClockingSystem/ClockingDashboard";




function App() {
  var token = localStorage.getItem("accessToken");
  console.log(token);

  if (!token) {
  }

  return (
    <div className="App">
      <Helmet>
          <meta charSet="utf-8" />
          <title>GTextERP</title>
          <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />{" "}
          <Route path="/checkin" element={<Clocking />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="expenses" element={<Expenses />} />
          <Route path="Income" element={<Income />} /> */}
          <Route path="Maindash"
           
          element={
          <RequireAuth>
          <Maindash />
          </RequireAuth>
                   }
          >
            <Route path="expenses" element={<Expenses />} />
          <Route path="Income" element={<Income />} />
          </Route>



          <Route
            path="/hr-dashboard"
            element={
              <RequireAuth>
                <HrDashboard />
              </RequireAuth>
            }
          >
            <Route index element={<OverView />} />
            <Route path="overview" element={<OverView />} />
            <Route path="people" element={<People />}>
              <Route index element={<Employee />} />
              <Route path="employee" element={<Employee />} />
              <Route path=":employeeId" element={<EmployeeId />} />
              <Route path="department" element={<Department />} />
              <Route path="designation" element={<Designation />} />
            </Route>
            <Route path="payroll" element={<Payroll />} />
            <Route path="leave" element={<Leave />}>
              <Route index element={<All />} />
              <Route path="all" element={<All />} />
              <Route path="pending" element={<Pending />} />
              <Route path="ongoing" element={<Ongoing />} />
              <Route path="completed" element={<Completed />} />
              <Route path="declined" element={<Declined />} />
            </Route>
            <Route path="recruitmentTabs" element={<RecruitmentTabs />} />
            
            <Route path="/hr-dashboard/recruitmentTabs/:recruitmentTabs" element={<RecruitmentTabsId />} />
            <Route path="attendance" element={<Attendance />}>
              <Route index element={<Staff />} />
              <Route path="staff" element={<Staff />} />
              <Route path="visitor" element={<Vistor />} />
            </Route>
            <Route path="documents" element={<Documents />} />
            <Route path="training" element={<Training />} />
            <Route path="reports" element={<Reports />} />
            <Route path="announcements" element={<Announcements />} />
          </Route>


           {/* ADMIN DASHBOARD */}
           <Route path="/admin" element={<AdminDashboard />}  >

</Route>


           {/* STAFF DASHBOARD */}

           <Route
            path="/staff"
            element={
              <RequireAuth>
                <StaffDashboard />
              </RequireAuth>
            }/>


            <Route
            path="/userStaffOnly/:userid"
            element={
              <RequireAuth>
                <EmployeeDetailsStaffOnly />
              </RequireAuth>
            }
          >
            <Route index element={<EmployeeInfoStaffOnly/>} />
          </Route>
          <Route path="*" element={<Error />} />







          
          <Route path="/staff/:staffId" element={<IndividualStaffId />} />
          <Route path="/staff/accounting" element={<Accounting />} />
          <Route path="/staff/humanresource" element={<HumanResource />} />
          <Route path="/staff/media" element={<Media />} />
          

          <Route path="clocking" element={<ClockingDashboard />} />
          <Route
            path="/user/:userid"
            element={
              <RequireAuth> 
                <EmployeeDetails />
              </RequireAuth>
            }
          />


          {/* CRM DASHBOARD */}
          <Route path="/crm" element={<CrmDashboard />}  >

          </Route>



          {/* Compliance DASHBOARD */}
          <Route path="/compliance" element={<ComplianceDashboard />}  >

          </Route>





 {/* SALES DASHBOARD */}
          <Route path="/sales" element={<SalesDashboard />}  >
          <Route index element={<Leads />} />
          {/* <Route path="comission" element={<Commission />} /> */}
              <Route path="product" element={<Product />} />
          </Route>


          <Route path="sales/product/:prodId" element={<IndividualProductId />} />   




          <Route path="clocking" element={<ClockingSystem />} />
          {/* </Route> */}
          <Route
            path="/user/:userid"
            element={
              <RequireAuth>
                <EmployeeDetails />
              </RequireAuth>
            }
          >
            <Route index element={<EmployeeInfo />} />
            <Route path="employee-info" element={<EmployeeInfo />} />
            <Route path="performance" element={<Performance />} />
            <Route path="leave" element={<Leave />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="pay" element={<UserPayroll />} />
            <Route path="document" element={<Document />} />
            <Route path="notes" element={<UserNotes />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </AuthProvider>

      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
