import { Box } from "@mui/material";
import React from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";

const Attendance = () => {
  return (
    <>
      <Box display="flex">
        <STable>
          <SRow>
            <SData>WORKING DAYS</SData>
            <SData>25</SData>
          </SRow>
          <SRow>
            <SData>PRESENT</SData>
            <SData>25</SData>
          </SRow>
          <SRow>
            <SData>ABSENT</SData>
            <SData>25</SData>
          </SRow>
          <SRow>
            <SData>LEAVE</SData>
            <SData>25</SData>
          </SRow>
          <SRow>
            <SData>HOLIDAY</SData>
            <SData>25</SData>
          </SRow>
        </STable>
        <STable>
          <SRow>
            <SData>WORKING DAYS</SData>
            <SData>25</SData>
          </SRow>
          <SRow>
            <SData>PRESENT</SData>
            <SData>25</SData>
          </SRow>
          <SRow>
            <SData>ABSENT</SData>
            <SData>25</SData>
          </SRow>
          <SRow>
            <SData>LEAVE</SData>
            <SData>25</SData>
          </SRow>
          <SRow>
            <SData>HOLIDAY</SData>
            <SData>25</SData>
          </SRow>
        </STable>
      </Box>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Work Duration</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10/10/2022</td>
            <td>Present</td>
            <td>07:47:33</td>
            <td>18:05:40</td>
            <td>10h 19m</td>
            <td>Normal</td>
          </tr>
          <tr>
            <td>10/10/2022</td>
            <td>Present</td>
            <td>07:47:33</td>
            <td>18:05:40</td>
            <td>10h 19m</td>
            <td>Normal</td>
          </tr>
          <tr>
            <td>10/10/2022</td>
            <td>Present</td>
            <td>07:47:33</td>
            <td>18:05:40</td>
            <td>10h 19m</td>
            <td>Normal</td>
          </tr>
          <tr>
            <td>10/10/2022</td>
            <td>Present</td>
            <td>07:47:33</td>
            <td>18:05:40</td>
            <td>10h 19m</td>
            <td>Normal</td>
          </tr>
          <tr>
            <td>10/10/2022</td>
            <td>Present</td>
            <td>07:47:33</td>
            <td>18:05:40</td>
            <td>10h 19m</td>
            <td>Normal</td>
          </tr>
          <tr>
            <td>10/10/2022</td>
            <td>Present</td>
            <td>07:47:33</td>
            <td>18:05:40</td>
            <td>10h 19m</td>
            <td>Normal</td>
          </tr>
          <tr>
            <td>10/10/2022</td>
            <td>Present</td>
            <td>07:47:33</td>
            <td>18:05:40</td>
            <td>10h 19m</td>
            <td>Normal</td>
          </tr>
          <tr>
            <td>10/10/2022</td>
            <td>Present</td>
            <td>07:47:33</td>
            <td>18:05:40</td>
            <td>10h 19m</td>
            <td>Normal</td>
          </tr>
          <tr>
            <td>10/10/2022</td>
            <td>Present</td>
            <td>07:47:33</td>
            <td>18:05:40</td>
            <td>10h 19m</td>
            <td>Normal</td>
          </tr>
          <tr>
            <td>10/10/2022</td>
            <td>Present</td>
            <td>07:47:33</td>
            <td>18:05:40</td>
            <td>10h 19m</td>
            <td>Normal</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Attendance;

const STable = styled.div`
  width: 50%;
  padding: 10px 40px;
  margin: 30px 0px;
  border: 2px solid #d9d9d9;
`;
const SData = styled.div``;
const SRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 40px;
`;
