import { Box } from "@mui/material";
import React from "react";
import ErrorPage from "../images/error.png";

const Error = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
    >
      <img src={ErrorPage} />
    </Box>
  );
};

export default Error;