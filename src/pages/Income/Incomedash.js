import React from "react";
import TopNav from "../../components/TopNav";
import Income from "./Income";

const Incomedash = () => {
  const name = "Expeness"


  return (
  <div>
    <TopNav name={name} />
    <div>
      <Income />
    </div>
  </div>
  );
};

export default Incomedash;
