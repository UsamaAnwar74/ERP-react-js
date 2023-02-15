import React from "react";
import "./taskList.css";

const taskList = () => {
  return (
    <div className="task-container">
      <div className="top-text">
        <h5>Task List</h5>
        <h6>View all</h6>
      </div>
      <table>
        <tr>
          <td>09:00</td>
          <td> Meeting with MD</td>
          <td>09:00</td>
        </tr>
      </table>
    </div>
  );
};

export default taskList;
