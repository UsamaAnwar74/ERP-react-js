import React from "react";
import { Link } from "react-router-dom";

const ViewCard = (props) => {
  return (
    <div className="view-card">
      <div className="view-card-top">
        <h5>{props.view.num}</h5>
        <p>{props.view.name}</p>
      </div>
      <div className="view-card-bottom">
        <Link to={props.view.link}>
          <div>View {props.view.name}</div>
        </Link>
      </div>
    </div>
  );
};

export default ViewCard;
