import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Leads from './Leads/Leads';
import Product from './Product/Product';
import Landlords from './Product/Landlords';


function SalesTabs() {
  return (
    <div className='mt-4'>
    <Tabs
      defaultActiveKey="product"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="product" title="Properties" >
      <Product />
       
      </Tab>
      <Tab eventKey="leads" title="Leads">
        <Leads />
      </Tab>
      <Tab eventKey="landlords" title="Landlords">
         <Landlords />
      </Tab>
      <Tab eventKey="commission" title="Commission">
         {/* <Sonnet /> */}
      </Tab>
     
    </Tabs>
    </div>
  );
}

export default SalesTabs;