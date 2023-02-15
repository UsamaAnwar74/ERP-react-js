import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Applications from './Applications';
import Recruitment from './Recruitment';

function RecruitmentTabs() {
  return (
    <Tabs
      defaultActiveKey="recruitment"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="recruitment" title="Recruitment">
        <Recruitment />
      </Tab>
      <Tab eventKey="applications" title="Applications">
        <Applications />
      </Tab>
    </Tabs>
  );
}

export default RecruitmentTabs;