import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const IndividualStaffId = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [staffInfos, setStaffInfos] = useState({});
    const [individualInfo, setIndividualInfo] = useState({});

    const navigate = useNavigate();
    let  id  = useParams();

    useEffect(() => {
        setIsLoading(true);
        var token = localStorage.getItem("accessToken");
        console.log(token);
        if (!token) {
          navigate("/login");
        }
    
        const headers = {
          contentType: "application/json",
          Authorization: "Bearer " + token,
        };
        axios.get(`https://gtexterp.herokuapp.com/api/task/one?id=${id.staffId}`, {
            headers: headers,
          })
          .then((response) => {
            setIsLoading(false);
            console.log(response.data.data);
            let employeeData = response.data.data;
            setIndividualInfo(employeeData);
            let objectData = response.data.data;
          })
          .catch((err) => {
            setIsLoading(false);
            console.error(err);
          });
      }, []);
                                                                                      

    return (
        <div className="container-fluid mb-4 p-5">
            <div className="d-flex justify-content-between">
            <h2>{individualInfo.name}</h2>
            <button onClick={() => navigate(-1)} className="sm-btn">
          Back
        </button>
            </div>

            <div className="mt-5 d-flex justify-content-between">
            <div className="row mt-3">
                <p>{individualInfo.description}</p>
            </div>
            </div>
            {  individualInfo.completed === 'To Do' ?  <h2 class="badge rounded-pill status  text-white mt-2  bg-danger" >{individualInfo.completed}</h2>: individualInfo.completed === 'In progress' ? <h2 class="badge rounded-pill status mt-2  bg-warning text-dark" >{individualInfo.completed}</h2> :  individualInfo.completed === 'In Review' ? <h2 class="badge rounded-pill status text-white mt-2  bg-primary" >{individualInfo.completed}</h2> : <h2 class="badge rounded-pill status text-white mt-2  bg-success" >{individualInfo.completed}</h2> }
    
        </div>
    )
}


export default IndividualStaffId;