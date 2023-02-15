import React from "react";
import { NavLink } from "react-router-dom";

const PeopleNavLink = () => {
  const links = [
    { name: "Employee", link: "employee" },
    { name: "Department", link: "department" },
    { name: "Branch ", link: "designation" },
  ];

  return (
    <>
      <div className="people-nav-links">
        <ul>
          {links.map((link) => (
            <NavLink to={link.link}>
              <li>{link.name}</li>
            </NavLink>
          ))}
        </ul>
        <div className="search-input">
          <input text="" placeholder="Search Employee" />
          <img src="images/search.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default PeopleNavLink;
