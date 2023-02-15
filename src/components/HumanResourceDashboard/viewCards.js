import React from "react";
import { NavLink } from "react-router-dom";
import "./viewCards.css";

const viewCards = () => {
  return (
    <div className="viewCard">
      <div className="top"></div>
      <NavLink to="/dashboard/hr/people">
        <div className="bottom">bndgfdf</div>
      </NavLink>
    </div>
  );
};

export default viewCards;
