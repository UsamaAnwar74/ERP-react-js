import { Box } from "@mui/material";
import { React, useState, useEffect } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import TopNav from "../../components/TopNav";
import UserNavLink from "./UserNavLink";
import ProfileImg from "../../images/profile.png";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";

const UserDetails = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userDetails, setUserDetails] = useState({});
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

  return (
    <>
      <TopNav />
      <Box padding="0px 70px">
        <button onClick={() => navigate(-1)} className="sm-btn">
          Back
        </button>

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

        <UserNavLink />
        <Outlet />
      </Box>
    </>
  );
};

export default UserDetails;
