import { Fragment, useState } from "react";
import AppBar from "../appbar";
import Body from "../body";
import RightSide from "../right-side";
import TaskForm from "./TaskForm/TaskForm";
import "./overview.css";

const OverView = () => {


  return (
    <Fragment>
      {/* <HumanResourcesDashboard /> */}
      <div className="body">
        <Body />
        <RightSide />
      </div>
    </Fragment>
  );
};

export default OverView;
