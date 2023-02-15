import React from "react";
import { Outlet } from "react-router-dom";
import HrNavLinks from "./HrNavLinks";
import TopNav from "../../components/TopNav";

const HrDashboard = () => {
  const name = "Human Resources";

  return (
    <>
      <TopNav name={name} />
      <div className="hr-body">
        <HrNavLinks />
        <Outlet />
      </div>
    </>
  );
};

export default HrDashboard;
