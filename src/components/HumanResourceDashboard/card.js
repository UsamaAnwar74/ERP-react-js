import './card.css';


const Card = () => {
    return (
        <div className="card">
            <div className='card1'>
                 <div className='p-4'>50
                <p>Employees</p></div>
                <div className="ccorn">View Employees</div>
            </div>


            <div className='card1'>
                <div className='p-4'>9
                <p>Departments</p></div>
                <div className="ccorn">View Employees</div>
            </div>


            <div className='card1'>
                <div className='p-4'>5
                <p>Designations</p></div>
                <div className="ccorn">View Designations</div>
            </div>
        </div>
    )
}

export default Card;