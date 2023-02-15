import TopNav from "../../components/TopNav";
import ComplianceTable from "./ComplianceTable";

const ComplianceDashboard = () => {
    const name = "Compliance";

    return(
        <div>
            <TopNav name={name} />
            <div>
                <ComplianceTable />
            </div>
        </div>
    )
}


export default ComplianceDashboard;