import React from "react";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
  const links = [
    { name: "Employee Information", link: "employee-info" },
    { name: "Performance", link: "performance" },
    { name: "Leave", link: "leave" },
    { name: "Attendance", link: "attendance" },
    { name: "Payroll", link: "pay" },
    { name: "Documents", link: "document" },
    { name: "Notes", link: "notes" },
  ];

  return (
    <div>
      <ul className="hr-nav-links">
        {links.map((link) => (
          <NavLink to={link.link}>
            <li>{link.name}</li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default NavLinks;
