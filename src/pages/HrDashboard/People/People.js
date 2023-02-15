import React from "react";
import { Outlet } from "react-router-dom";
import PeopleNavLink from "./PeopleNavLink";

const People = () => {
  return (
    <>
      <PeopleNavLink />
      <Outlet />
    </>
  );
};

export default People;
