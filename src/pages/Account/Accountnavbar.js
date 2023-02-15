import React from "react";
import { NavLink } from "react-router-dom";

const AccountNavbar = () => {
  const links = [
    { name: "expenses", link: "Expenses" },
    { name: "Income", link: "Income" },
   
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

export default AccountNavbar;
