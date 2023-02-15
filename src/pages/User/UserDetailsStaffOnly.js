import { Box } from "@mui/material";
import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link, Outlet, useNavigate } from "react-router-dom";
import TopNav from "../../components/TopNav";
import UserNavLink from "./UserNavLink";
import ProfileImg from "../../images/profile.png";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import EditEmployeeForm from "../HrDashboard/People/Employee/EditEmployeeForm";
import { toast } from "react-toastify";
import swal from "sweetalert";

const UserDetails = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [activeClass, setActiveClass] = useState(false);
  const navigate = useNavigate();

  //  console.log( props.employeeInfo._id, " props.employeeInfo._id");

  let email, phone, first_name, position;
  let _id;

  const params = useParams();
  console.log("params", params.userid, "params");
  // const thisUser = personalId.find(({_id}) => stringIsEqual(userId, _id));
  // console.log(thisUser);
  useEffect(() => {
    setIsLoading(true);
    var token = localStorage.getItem("accessToken");

    const headers = {
      contentType: "application/json",
      Authorization: "Bearer " + token,
    };

    axios
      .get(
        `https://gtexterp.herokuapp.com/api/profile/get?id=${params.userid} `,
        {
          headers: headers,
        }
      )
      .then((response) => {
        // if(response.data != true){
        //   alert("no data found")
        //   throw Error('Could not fetch the data for that resource');
        // }
        setIsLoading(false);
        console.log(response.data.data);
        let userInfo = response.data.data;
        setUserDetails(userInfo);
        console.log(setUserDetails(userInfo), "nene");

        email = response.data.data.email;
        phone = response.data.data.phone;
        first_name = response.data.data.first_name;
        position = response.data.data.position;
        _id = response.data.data._id;
        console.log("phone", phone, email);

        setErrorMessage(null);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.message);
        console.error(err);
      });
  }, []);

  // console.log(first_name);


  async function deleteHandler(event) {
    event.preventDefault();
    setIsLoading(true);

    
    var organization = localStorage.getItem("organization");


    var token = localStorage.getItem("accessToken");

    const config = {
      headers: {
        contentType: "application/json",
        Authorization: "Bearer " + token,
      },
    };


    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        
    axios
    .delete(`https://gtexterp.herokuapp.com/api/staff/delete?id=${params.userid}`, config)
    .then((response) => {
      setIsLoading(false);
      toast.success('Staff Deleted successfully');
      navigate(-1);
    })
    .catch((err) => {
      toast.error(err.response.data.message);
      setIsLoading(false);
      console.log(err.response.data.message);
    });
 
      } else {
        swal("Your imaginary file is safe!");
      }
    });



    // }
  }



  const toggleForm = () => {
    setActiveClass(!activeClass);
  };

  return (
    <>
      <TopNav />
      <Box padding="0px 70px">

        <div className="d-flex justify-content-between">
        <div><Link style={{ color:'white', textDecoration:'none' }} to='/staff' className="sm-btn">

          Back
        </Link></div>
       
        </div>

        <Box>{/* { console.log(userDetails.first_name)} */}</Box>
        {/* {userDetails ?  userDetails.map((userDetail, userDetailInfo) => ( */}
        <Box
          border="1px solid #901C42"
          borderRadius="20px"
          height="280px"
          width="100%"
          display="flex"
          padding="40px 190px"
        >
          <img src={ProfileImg} />
          <Box margin="0px 0px 0px 40px">
            <Box width="600px">
              <h3 style={{ textTransform: "capitalize", padding: "0px 6px" }}>
                {userDetails.first_name} {userDetails.last_name}
              </h3>
              <h6 style={{ textTransform: "uppercase", padding: "0px 8px" }}>
                {userDetails.position}
              </h6>
            </Box>
            <Box>
              <Table>
                <tbody>
                  <tr>
                    <td style={{ marginRight: "30px" }}>Work Phone</td>
                    <td>{userDetails.phone}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{userDetails.email}</td>
                  </tr>
                  <tr>
                    <td>Home Address</td>
                    <td>
                      {userDetails.house_number}
                      {userDetails.house_address}
                      {/* 309 Close , Ondo Street, Banana Island, Ikoyi, Lagos. */}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Box>
          </Box>
        </Box>
        {/* )) : null} */}


        <Outlet />
      </Box>
    </>
  );
};

export default UserDetails;
