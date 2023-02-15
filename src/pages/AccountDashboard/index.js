import TopNav from "../../components/TopNav";
import AccountsTable from "./Accounts/AccountsTable";

const AccountsDashboard = () => {
    const name = "Accounts"

    return (
        <div>
            <TopNav name={name} />
            <div>
                <AccountsTable />
            </div>
        </div>
    )
}

export default AccountsDashboard; 