import './appbar.css';


const AppBar = () => {

    return (
        <div className="d-flex justify-content-between p-4 appbar">
            
            <div><img src="/images/glogo.png" /></div>
            <div className='appbartext'>Human Resources</div>
            <div className='d-flex'>
                <div className="avatar"></div>
                <div>ireyimika</div>
            </div>
        </div>
    )
}

export default AppBar;