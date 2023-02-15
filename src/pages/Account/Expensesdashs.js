import React from "react";
import TopNav from "../../components/TopNav";
import Expenses from "./Expenses";

const Expensesdashs = () => {
  const name = "Expeness"


  return (
  <div>
    <TopNav name={name} />
    <div>
      <Expenses />
      
    </div>
  </div>
  );
};

export default Expensesdashs;
