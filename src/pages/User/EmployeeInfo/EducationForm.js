import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EducationForm = ({ toggleForm }, props) => {
  const navigate = useNavigate();

  const [schoolName, setSchoolName] = useState("");
  const [schoolLocation, setSchoolLocation] = useState("");
  const [course, setCourse] = useState("");
  const [schoolStartDate, setSchoolStartDate] = useState("");
  const [schoolEndDate, setSchoolEndDate] = useState("");

  const [educationInfo, setEducationInfo] = useState({});
  const [departmentId, setDepartmentId] = useState("");

  const params = useParams();

  useEffect(() => {
    // const fetchData = (inputValue, callback ) => {
    var token = localStorage.getItem("accessToken");

    const config = {
      headers: {
        contentType: "application/json",
        Authorization: "Bearer " + token,
      },
    };
    // let getDepartmentOptions = async () => {
    axios
      .get("https://gtexterp.herokuapp.com/api/department/get", config)
      .then((response) => {
        console.log(response);
        console.log("gvcchjewfgfhj", response.data.data);
        let educationData = response.data.data;
        setEducationInfo([...educationData]);
        console.log(setEducationInfo([...educationData]));
      })
      .catch((err) => {
        console.error(err.response);
        //setErrorMsg(err.data.message)
      });
  }, []);

  async function HandleSubmit(event) {
    event.preventDefault();

    var organization = localStorage.getItem("organization");

    const data = {
      name: schoolName,
      location: schoolLocation,
      course: course,
      start_date: schoolStartDate,
      end_date: schoolEndDate,
      staff: params.userid,
      // "636e385053f572a881482463"
    };

    var token = localStorage.getItem("accessToken");

    const config = {
      headers: {
        contentType: "application/json",
        Authorization: "Bearer " + token,
      },
    };

    axios
      .post(
        "https://gtexterp.herokuapp.com/api/staff/createInstitution",
        data,
        config
      )
      .then((response) => {
        console.log(response);
        console.log(response.data.user, "nigga raw");
        console.log("12345");
        toast.success("Staff Education created successfully")
      //  alert("Staff created successfully ");
        navigate(-1);
      })
      .catch((err) => {
        console.error(err.response);
        toast.error(err.response.data.message);
        //setErrorMsg(err.data.message)
      });

    // }
  }

  return (
    <div>
      <div className="educationForm">
        <div className="edu-top-title">
          <h5>Education</h5>
          <h4
            onClick={() => {
              toggleForm();
            }}
          >
            X
          </h4>
        </div>
        <form onSubmit={HandleSubmit}>
          <div>
            <img src="" className="" />
          </div>
          <div className="education-form-container">
            <div className="employee-form-input">
              <label htmlFor="school-name">Name Of School</label>
              <input
                className="input-field"
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="school-location">Location Of School</label>
              <input
                className="input-field"
                type="text"
                value={schoolLocation}
                onChange={(e) => setSchoolLocation(e.target.value)}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="course">Course</label>
              <input
                className="input-field"
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="schoolStartDate">School Start Date</label>
              <input
                className="input-field"
                type="date"
                value={schoolStartDate}
                onChange={(e) => setSchoolStartDate(e.target.value)}
              />
            </div>
            <div className="employee-form-input">
              <label htmlFor="schoolEndDate">School End Date</label>
              <input
                className="input-field"
                type="date"
                value={schoolEndDate}
                onChange={(e) => setSchoolEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="employee-form-container-button">
            <button type="submit">SAVE</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationForm;
