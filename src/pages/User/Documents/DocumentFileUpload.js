import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function DocumentFileUploadForm({ toggleForm }, props) {
  const [uploadFile, setUploadFile] = useState(null);
  const [superHero, setSuperHero] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  console.log("yet", params.userid, "yet");

  const submitForm = (event) => {
    event.preventDefault();
    console.log(event.target.uploadFile);
    const formData = new FormData();
    //   dataArray.append("superHeroName", superHero);
    formData.append("name", superHero);
    formData.append("file", uploadFile);
   console.log(uploadFile, "next");
    var token = localStorage.getItem("accessToken");

    const config = {
      headers: {
        contentType: "application/json",
        Authorization: "Bearer " + token,
      },
    };
  //  console.log("Hello world");
    axios
      .post(
        `https://gtexterp.herokuapp.com/api/document/add?id=${params.userid}&document_type=${superHero}`,
        formData,
        config
      )
      .then((response) => {
        toast.success("Uploaded  successfully");
        //alert("Uploaded  successfully ");
        // console.log("success");
     //  console.log(response);
        // console.log(response, "hhhhhhhhhhhhhhhhhhh");
        // console.log("12345");

        navigate(-1);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Network Error")
        // console.log(error.response.message, "heyyyy");
        // error response
      });
  };
  return (
    <div>
      <div className="educationForm">
        <div className="edu-top-title">
          <h5>Upload File</h5>
          <h4
            onClick={() => {
              toggleForm();
            }}
          >
            X
          </h4>
        </div>
        <form className="educationForm" onSubmit={submitForm}>
          <div className="education-form-container">
            <div className="employee-form-input">
              <input
                type="text"
                onChange={(e) => setSuperHero(e.target.value)}
                placeholder={"Superhero Name"}
              />
            </div>

            <br />
            <div className="employee-form-input">
              <input
                type="file"
                onChange={(e) => setUploadFile(e.target.files[0])}
              />
              {console.log(uploadFile)}
            </div>
            <br />
            <div className="employee-form-container-button">
              <button type="submit">SAVE</button>
            </div>
          </div>
        </form>
      </div>

      {/* <form onSubmit={submitForm}>
      
        </form> */}
    </div>
  );
}

export default DocumentFileUploadForm;
