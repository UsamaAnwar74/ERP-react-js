import './payroll.css';
import StripedRowExample from './payrollTable';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useState } from 'react'






const PayRoll = () => {
    const [showModal, setShowModal] = useState(false);


    return (
        <div>

            <button className="btn"><AddTwoToneIcon /> Export Payroll</button>

            <StripedRowExample />
        </div>
    )
}

export default PayRoll;