import React from "react";
import TopNav from "../../components/TopNav";
import CrmTable from "./CrmTable";

const CrmDashboard = () => {
  const name = "Crm"


  return (
  <div>
    <TopNav name={name} />
    <div>
      <CrmTable />
    </div>
  </div>
  );
};

export default CrmDashboard;
