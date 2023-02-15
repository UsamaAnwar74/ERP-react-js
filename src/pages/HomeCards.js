import React from "react";

const HomeCards = (props) => {
  return (
    <div className="home-cards">
      <img src={props.dep.depIcon} alt="dep-icon" />
      {props.dep.depName}
    </div>
  );
};

export default HomeCards;
