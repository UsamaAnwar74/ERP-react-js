import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import SearchIcon from "../../../images/search.png";

const Attendance = () => {
  const links = [
    { name: "Staff", path: "staff" },
    { name: "Visitor", path: "visitor" },
  ];

  
  return (
    <>
      <div className="d-flex justify-content-end">
        <div className="search-input ">
          <input placeholder="Search Employee" />
          <img src={SearchIcon} alt="" />
        </div>
      </div>
      <div className="people-nav-links">
        <ul className="w-25">
          {links.map((link) => (
            <NavLink to={link.path}>
              <li>{link.name}</li>
            </NavLink>
          ))}
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default Attendance;
