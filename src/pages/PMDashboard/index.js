import TopNav from "../../components/TopNav";
import ComplianceTable from "./ComplianceTable";

const PMDashboard = () => {
    const name = "Project Management Dashboard";

    return(
        <div>
            <TopNav name={name} />
            <div>
                <ComplianceTable />
            </div>
        </div>
    )
}


export default PMDashboard;