import React from "react";
import TopNav from "../../components/TopNav";
import Clockingtop from "./Clocking";
import ClockingTable from "./ClockingTable"

const ClockingDashboard = () => {
  const name = "Clocking System"

  return (
  <div  className="bg">
    <TopNav name={name} />
    <div>
      <Clockingtop />
      <ClockingTable/>
    </div>
  </div>
  );
};

export default ClockingDashboard;
