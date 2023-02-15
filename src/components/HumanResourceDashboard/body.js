import ViewCard from "../HumanResourceDashboard/viewCards";
import FullCalendar from "@fullcalendar/react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./body.css";
import TaskForm from "./overview/TaskForm/TaskForm";

const Body = () => {
  const [events, setEvents] = useState([]);
  const [activeClass, setActiveClass] = useState(false);

  const handleSelect = (info) => {
    const { start, end } = info;
    const eventNamePrompt = setActiveClass(true);

    if (eventNamePrompt) {
      setEvents([
        ...events,
        {
          start,
          end,
          title: eventNamePrompt,
          id: uuid(),
        },
      ]);
    }
  };

  const EventItem = ({ info }) => {
    const { event } = info;
    return (
      <div>
        <p>{event.title}</p>
      </div>
    );
  };

  const viewCards = [
    {
      num: 1,
    },
    {
      num: 1,
    },
    {
      num: 1,
    },
  ];
  return (
    <div className="overviewBody">
      <div className="viewCards">
        {viewCards.map(({ item, index }) => (
          <ViewCard data={viewCards} />
        ))}
      </div>
      <FullCalendar
        className="calender"
        editable
        selectable
        events={events}
        select={handleSelect}
        headerToolbar={{
          start: "today prev next",
          end: "dayGridMonth dayGridWeek dayGridDay",
        }}
        eventContent={(info) => <EventItem info={info} />}
        plugins={[daygridPlugin, interactionPlugin]}
        views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
      />
      <div className={`task-form ${activeClass ? "show" : ""}`}>
        <div className={`overlay ${activeClass ? "show" : ""}`}></div>
        <div className={`task-form-container ${activeClass ? "show" : ""}`}>
          <TaskForm />
        </div>
      </div>
    </div>
  );
};

export default Body;
