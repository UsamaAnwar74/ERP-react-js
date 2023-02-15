// import {  useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import TopNav from "../../../../components/TopNav";
// import { Box, Typography } from "@mui/material";
// import { Outlet } from "react-router-dom";
// import { Table } from "react-bootstrap";
// import ProfileImg from  '../../../../images/profile.png';
// import NavLinks from "../../../User/UserNavLink";
// import UserDetails from "../../../User/UserDetails";
// import EmployeeNavLinks from "./EmployeeNavLink";



// const EmployeeId = (props)  => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [userDetails, setUserDetails] = useState([]);

// let params = useParams();
// console.log(params, "nothiiiiiiiiiiiiiiiiiiiiiiiiing");
// // console.log(props.employeeInfo._id, "yeahh");


// var email = localStorage.getItem("email");
// var phone = localStorage.getItem("phone");
// var first_name = localStorage.getItem("first_name");
// var last_name = localStorage.getItem("last_name");
// var position = localStorage.getItem("position");
// var house_address = localStorage.getItem("house_address");


// useEffect(() => {
//   setIsLoading(true)
//   var token = localStorage.getItem("accessToken")
 


//   const headers = {
//       contentType : "application/json",
//       Authorization : "Bearer " +  token
//   }
  
//   axios.get("https://gtexterp.herokuapp.com/api/auth/user", {
//       headers : headers
//   })
//       .then(response => {
//         if(!response){
//           throw Error('Could not fetch the data for that resource')
//         }
//         setIsLoading(false)
//           console.log(response.data.data)
//           let userInfo = response.data.data
//           let email = response.data.data.email;

//           console.log(email);
        
//           setUserDetails([...userInfo]);
//           setErrorMessage(null);
         

    


//             }) 
//             .catch(err=> {
//               setIsLoading(false)
//               setErrorMessage(err.message)
//                 console.error(err)
//             })
//     }, [])


//     return(
//        <>
//        <TopNav />
//       <Box padding="0px 70px">
//         <Box>
//           <h5>Back</h5>
//           <Box></Box>
//         </Box>
//         {/* {userDetails ?  userDetails.map((userDetail, userDetailInfo) => ( */}
//           <Box
//           border="1px solid #901C42"
//           borderRadius="20px"
//           height="280px"
//           width="100%"
//           display="flex"
//           padding="40px 70px"
//         >
//           <img src={ProfileImg} />
//           <Box margin="0px 0px 0px 40px">
//             <Box>
//               <h3>Adeniyi  Alaka</h3> <h6>Managing Director</h6>
//             </Box>
//             <Box>
//               <Table>
//                 <tbody>
//                   <tr>
//                     <td>Work Phone</td>
//                     <td>07033459675</td>
//                   </tr>
//                   <tr>
//                     <td>Email</td>
//                     <td>ayennkdfdf.ajwhhhj@gtext.com</td>
//                   </tr>
//                   <tr>
//                     <td>Home Address</td>
//                     <td>
//                       309 Close , Ondo Street, Banana Island, Ikoyi, Lagos.
//                     </td>
//                   </tr>
//                 </tbody>
//               </Table>
//             </Box>
//           </Box>
//         </Box>
//         {/* )) : null} */}
        
//         <EmployeeNavLinks />
//         <Outlet />
//       </Box>
//        </>
//     )
// }

// export default EmployeeId;