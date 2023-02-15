import TopNav from "../../components/TopNav";
import AdminTable from "./AdminTable";

const AdminDashboard = () => {
    const name = "Admin"

    return (
        <div>
            <TopNav name={name} />
            <div>
                <AdminTable />
            </div>
        </div>
    )
}

export default AdminDashboard;