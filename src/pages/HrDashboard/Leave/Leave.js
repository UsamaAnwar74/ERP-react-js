import React from "react";
import { Table } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

const Leave = () => {
  const links = [
    { name: "All", link: "all" },
    { name: "Pending", link: "pending" },
    { name: "Ongoing", link: "ongoing" },
    { name: "Completed", link: "completed" },
    { name: "Declined", link: "declined" },
  ];

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="people-nav-links">
          <ul>
            {links.map((link) => (
              <NavLink to={link.link}>
                {/* <li>{link.name}</li> */}
              </NavLink>
            ))}
          </ul>
        </div>
        <div className="search-input">
          <input text="" placeholder="Search Employee" />
          <img src="images/search.png" alt="" />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Leave;
