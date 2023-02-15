import { Link } from 'react-router-dom';
import './appbar.css';


const Appbar = () => {

    return (
        <div className="header" >
            <div className="d-flex justify-content-between">
            <div className='logoimg'><img src="/images/glogo.png"  /></div>
            <div className="ml-2  d-flex p-3">
                <div className='login'> <Link to="/login">Log In</Link></div>
                {/* <div><button className='btnsignup'>Sign Up</button></div> */}
            </div>
            </div>
            <hr className='new1' />
            <div className="headertext">
                <span> Choose Your Module </span> 
            {/* <p>dgrh gfgfbgb bgfbgfbg fggbddfffb</p> */}
            </div>
           
        </div>
    )
}

export default Appbar;