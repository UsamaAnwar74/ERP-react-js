import Appbar from "../../appbar/appbar";
import "./payroll.css";
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import KeyboardArrowLeftTwoToneIcon from '@mui/icons-material/KeyboardArrowLeftTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import PayRollTabs from "./payrollTabs";




const PayRollIndividualInfo = () => {
    return(
        <div className="p-2 payrollindividualinfo">
            <div className="d-flex justify-content-between p-2 ">
                <div><KeyboardArrowLeftTwoToneIcon />Back</div>
                <div className="d-flex gap-4 payrollbtn">
                    <div><button className="pl-3 btn1"><EditTwoToneIcon /> Edit</button></div>
                    <div><button className="btn2"><RemoveCircleTwoToneIcon />Terminate</button></div>
                </div>
            </div>
            <div className="individualctninfo">
                <div className="info">
                    <div><img src="/images/gg.png" /></div>
                    <div>
                        <div><strong>Adeniyi Akala</strong></div>
                    <p>Managing Director</p>
                    <div className="individualinfo">
                        <div>
                            <p>Work Phone</p>
                            <p>Email</p>
                            <p>Home Address</p>
                        </div>
                        <div>
                            <p>07045678896</p>
                            <p>dfrgthht@gmail.com</p>
                            <p>309 Road, Ondo Street, Banana Island, Ikoyi Lagos</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <PayRollTabs />
        </div>
    )
}

export default PayRollIndividualInfo;