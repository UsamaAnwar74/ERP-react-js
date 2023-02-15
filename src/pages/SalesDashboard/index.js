import TopNav from "../../components/TopNav";
import SalesTabs from "./SalesTabs";
import "./sales.css"



const SalesDashboard = () => {
    const name = "SALES"

    return(
        <div>
            <TopNav name={name} />

            <SalesTabs />
        </div>
    )
}


export default SalesDashboard;