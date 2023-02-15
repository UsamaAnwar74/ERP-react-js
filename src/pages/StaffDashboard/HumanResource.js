import React from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import Layout from "./Layout";


 const HumanResource = () => {
  return (
    <Layout name="Human Resource">
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Assigned to</th>
              <th>Task assigned</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Fred</td>
              <td>UI implementaion</td>
              <td>
                <select>
                  <option>Completed</option>
                  <option>In progress</option>
                  <option>Reviewed</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Fred</td>
              <td>UI implementaion</td>
              <td>
                <select>
                  <option>Completed</option>
                  <option>In progress</option>
                  <option>Reviewed</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>John</td>
              <td>UI implementaion</td>
              <td>
                <select>
                  <option>Completed</option>
                  <option>In progress</option>
                  <option>Reviewed</option>
                </select>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

export default HumanResource;
