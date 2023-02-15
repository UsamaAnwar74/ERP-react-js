import React from "react";
import "./TaskForm.css";

const TaskForm = () => {
  return (
    <div>
      <div className="taskForm">
        <div className="top-text">
          <h5>New event</h5>
        </div>
        <p>Complete the basic details of your event</p>
        <label htmlFor="event">Event Title</label>
        <input type="text" name="event" placeholder="Enter Event" id="event" />

        <div>
          <div>
            <label htmlFor="from">From</label>
            <input name="from" type="date" />
          </div>
          <div>
            <label htmlFor="to">From</label>
            <input name="to" type="date" />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
