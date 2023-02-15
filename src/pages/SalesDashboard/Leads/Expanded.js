import { useEffect, useState } from 'react';

import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "./Expanded.css";


const Expanded = (data) => {

    console.log("data on expand", data);

    const details = data.data ? data.data.data  : {};
    // const Details = data;

    const [isLoading, setIsLoading] = useState(false);
    const[location, setLocation] = useState('');
    const[intrest, setIntrest] = useState('');
    const[note, setnote] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {

        console.log("DATA:", data);
        e.preventDefault();
        
        const Leaddata = {
            location: location,
            intrest: intrest,
            note: note,
          };

          console.log(Leaddata);

      
          var token = localStorage.getItem("accessToken");
      
          const config = {
            headers: {
              contentType: "application/json",
              Authorization: "Bearer " + token,
            },
          };
      
          axios.post(
              "https://gtexterp.herokuapp.com/api/leads/update?id="+details._id,
              Leaddata,
              config
            ).then((response) => {
              console.log(response);
              console.log(response.data.user, "nigga raw");
              console.log("12345");
              toast.success("Staff Education created successfully")
              alert("Staff created successfully ");
              navigate(-1);
            }).catch((err) => {
              console.error(err.response);
              toast.error(err.response.data.message);
              //setErrorMsg(err.data.message)
            });
    }

    

    return (
        <div>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre>  */}

          <div className='details'>
          <h4>Details</h4>
          <h5>Fullname : <strong>{details.fullname? details.fullname : ''}</strong></h5>
          <h5>Email : <strong>{details.email ? details.email: ''}</strong></h5>
          <h5>Phone : <strong>{details.phone ? details.phone : ''}</strong></h5>
          <h5>Location : <strong>{details.location ? details.location: 'not mentioned'}</strong></h5>
          <h5>Sales agent : <strong>{details.sales_agent ? details.sales_agent.first_name+" ("+details.sales_agent.profession+")" : 'not assigned'}</strong></h5>
          </div>
            <label>Interested Location: </label>
            <form onSubmit = { handleSubmit }>
                <textarea name="location" className="input-field form-control" rows="3" cols="3" 
                    onChange={(event) => { setLocation(event.target.value) }}
                    value={location} >
                </textarea> 

                <label>Interested property type: </label>
                <textarea name="intrest" className="input-field form-control" rows="3" cols="3" 
                    onChange={(event) => { setIntrest(event.target.value) }}
                    value={intrest} 
                ></textarea> 

                <label>Note: </label>
                <textarea name="note" className="input-field form-control" rows="3" cols="3"  
                    onChange={(event) => { setnote(event.target.value) }}
                    value={note} 
                    ></textarea> 
                <button className="sm-btn btn-update" type="submit">Update</button>
            </form>
            <div>
            <button className="sm-btn">SAVE</button>
            <br></br>
            </div>
            <small>Last update: <strong>{details.updatedAt ? details.updatedAt : ''}</strong> </small>
            
            <hr></hr>
           
        </div>
    )
}

export default Expanded;