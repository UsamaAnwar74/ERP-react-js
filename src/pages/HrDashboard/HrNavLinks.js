import React from "react";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
  const links = [
    { name: "Overview", link: "overview" },
    { name: "People", link: "people" },
    { name: "Payroll", link: "payroll" },
    { name: "Leave", link: "leave" },
    { name: "Recruitment", link: "recruitmentTabs" },
    { name: "Attendance", link: "attendance" },
    // { name: "Documents", link: "document" },
    // { name: "Training", link: "training" },
    // { name: "Reports", link: "reports" },
    // { name: "Announcements", link: "announcement" },
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
