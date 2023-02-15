import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import NavLinks from "../../components/common/NavLinks";
import TopNav from "../../components/TopNav";
import Sidebar from "./Sidebar";
import StaffId from "./individualStaffId";

const Layout = ({ children, name }) => {
  return (
    <div>
      <TopNav name={name} />
      <Container>
        <Sidebar />
        <Main><StaffId /></Main>
        {/* <Main>{children}</Main> */}
      </Container>
    </div>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const Main = styled.div`
  height: 100vh;
  width: 70vw;
`;

export default Layout;
