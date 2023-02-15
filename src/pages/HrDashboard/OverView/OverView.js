import React from "react";
import ViewCard from "./ViewCard";
import FullCalendar from "@fullcalendar/react";
import {useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const OverView = () => {
  const navigate = useNavigate();
  const [employeeInfos, setEmployeeInfos] = useState([]);
  const [employeeData, setemployeeData] = useState([]);
  const [departmentInfos, setDepartmentInfos] = useState([]);
  const [designationInfos, setDesignationInfos] = useState([]);

  const [employee, setemployee] = useState([]);


  const [events, setEvents] = useState([]);
  const [activeClass, setActiveClass] = useState(false);

  useEffect(() => {
    var token = localStorage.getItem("accessToken");
    console.log(token);
    if (!token) {
      navigate("/login");
    }

    const headers = {
      contentType: "application/json",
      Authorization: "Bearer " + token,
    };

    axios.get("https://gtexterp.herokuapp.com/api/staff/get", {
        headers: headers,
      })
      .then((response) => {
        if (!response) {
          throw Error("Could not fetch the data for that resource");
       }
        console.log(response.data.data,);
        let employeeData = response.data.data;
        employeeData = employeeData.sort().reverse();
        setEmployeeInfos([...employeeData]);
        let employee = employeeData.length;
        
       // console.log(employee, "aaa")

         });

         axios.get("https://gtexterp.herokuapp.com/api/department/get", {
        headers : headers
    })
        .then(response => {
          
            console.log(response.data.data)
            let departmentData = response.data.data;
            departmentData = departmentData.sort().reverse();
            setDepartmentInfos([...departmentData]);
            let objectData = response.data.data;
            objectData = objectData.sort().reverse();
          });


          axios.get("https://gtexterp.herokuapp.com/api/branch/get", {
            headers : headers
        })
            .then(response => {
                console.log(response.data.data)
                let designationData = response.data.data
                designationData = designationData.sort().reverse();
                setDesignationInfos([...designationData]);
                let objectData = response.data.data;
                objectData = objectData.sort().reverse();
              });

   })



      // .catch((err) => {
      //   console.error(err);
      // });
   


  const handleSelect = (info) => {
    const { start, end } = info;
    const eventNamePrompt = "";
    setActiveClass(true);

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

  const views = [
    {
      num: employeeInfos ?.length,
      name: "Employee",
      link: "/hr-dashboard/people/employee",
    },
    {
      num: departmentInfos ?.length,
      name: "Department",
      link: "/hr-dashboard/people/department",
    },
    {
      num: designationInfos ?.length,
      name: "Designation",
      link: "/hr-dashboard/people/designation",
    },
  ];

  return (
    <div>
      <div className="over-view-body">
        <div>
          <div className="view-cards">
            {views.map((view) => (
              <ViewCard view={view} />
            ))}
          </div>
          <div className="mt-5">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
