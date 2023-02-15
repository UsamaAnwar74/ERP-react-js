import React from "react";
import { NavLink } from "react-router-dom";

const NavLinks = ({ links }) => {
  return (
    <div>
      <ul>
        {links.map((link) => (
          <NavLink to={link.path}>
            <li>{link.name}</li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default NavLinks;
