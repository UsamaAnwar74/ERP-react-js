import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";
import Logo from "../images/logo.png";

const TopNav = (props) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogot = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <nav className="top-nav">
      <Link to="/"><img src={Logo} alt="logo" /></Link>
      <h3>{props.name}</h3>
      {!auth.user && <Link to="/login">Login</Link>}

      {auth.user && (
        <>
          <div style={{ display: "flex" }}>
            <h1>{auth.user}</h1>
            <button onClick={handleLogot} className="sm-btn-trans">
              Logout
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default TopNav;
