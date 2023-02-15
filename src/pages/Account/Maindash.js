import React from "react";
import TopNav from "../../components/TopNav";
import Expenses from "./Expenses";
import AccountNavbar from "./Accountnavbar";

const Maindash = () => {
  const name = "Expeness"


  return (
  <div>
    <TopNav name={name} />
    <div>
      {/* <Expenses /> */}
      <AccountNavbar />

    </div>
  </div>
  );
};

export default Maindash;
