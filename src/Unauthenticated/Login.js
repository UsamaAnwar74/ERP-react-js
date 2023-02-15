import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../utils/auth";
import { useRef, useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import swal from "sweetalert";
import "./Login.css";
import Clock from "../images/clock.png";
import { Box } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const auth = useAuth();
  const navigate = useNavigate();

  // const [user, setUser] = useState("");
  const [userFocus, setUserFocus] = useState(false);
  const [loading, setLoading] = useState(false);

  // const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");

  // const handleLogin = () => {
  //   auth.login(user);
  //   navigate("/hr-dashboard");
  // };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    // auth.login(email);
    e.preventDefault();
    if (email === "") {
      setErrMsg("Enter Username");
      return;
    }
    if (password === "") {
      setErrMsg("Enter Password");
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    axios
      .post("https://gtexterp.herokuapp.com/api/auth/login", data)
      .then((response) => {
        setLoading(false);
        toast.success("Login Successful!")
        // swal("Login Successful!")
        console.log(response);
        console.log(email, password);
        console.log(response.data);
        localStorage.setItem("user", response.data.data.user);
        localStorage.setItem("department", response.data.data.user.department)
        localStorage.setItem("isHOD", response.data.data.user.head_of_department);

        localStorage.setItem("accessToken", response.data.data.token);
        localStorage.setItem(
          "organization",
          response.data.data.user.organization
        );
        localStorage.setItem("_id", response.data.data.user._id);
        localStorage.setItem("email", response.data.data.user.email);
        localStorage.setItem("phone", response.data.data.user.phone);
        localStorage.setItem("first_name", response.data.data.user.first_name);
        localStorage.setItem("last_name", response.data.data.user.last_name);
        localStorage.setItem("position", response.data.data.user.position);
        localStorage.setItem(
          "house_address",
          response.data.data.user.house_address
        );
        auth.login(response.data.data.user.first_name);

        navigate("/");
      })
      .catch((err) => {
        console.error(err.response);
        //setErrorMsg(err.data.message)
        toast.error(err.response.data.message);
        console.log(err.response, "yes it is");
        console.log(err.response.data.message, );
      
      setLoading(false);
        
      });
  };

  //validate user

  return (
    <section className="bg form-container d-flex justify-content-center align-items-center vh-100">
    
      <div className="d-flex flex-column align-items-center">
        <Link to="/clocking">
          <Box marginTop="10px">
            <img src={Clock} />
          </Box>
        </Link>
        <h5 className="text-center" id="topic">
          Access and manage your business activities <br />
          from this ERP account.
        </h5>
        <form
          className="login-form bg-white shadow p-4 form"
          onSubmit={handleSubmit}
        >
          {/* <div className="form-item d-flex flex-column">
            <label htmlFor="username">Name</label>
            <input
              className="form-control-lg"
              id="username"
              placeholder="Company name"
              autoComplete="off"
              type="text"
              onChange={(e) => {
                setUser(e.target.value);
              }}
              onFocus={() => {
                setUserFocus(true);
              }}
              onBlur={() => {
                setUserFocus(false);
              }}
              required
            />
          </div> */}

          <div className="form-item d-flex flex-column">
            <label htmlFor="email">Email</label>
            <input
              className="form-control-lg"
              type="text"
              id="email"
              placeholder="Email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onFocus={() => {
                setUserFocus(true);
              }}
              onBlur={() => {
                setUserFocus(false);
              }}
            />
          </div>

          <div className="form-item d-flex flex-column">
            <label htmlFor="password">Password</label>
            <div>
              <input
                className="form-control-lg w-100"
                type="password"
                id="password"
                placeholder="Password"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onFocus={() => {
                  setUserFocus(true);
                }}
                onBlur={() => {
                  setUserFocus(false);
                }}
                required
              />
              <img src="" />
            </div>
          </div>

          <div>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <button className="form-control-lg w-100 sm-btn" type="submit">
                Login
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

//   return (
//     <div>
//       <label>
//         Username:
//         <input
//           type="text"
//           onChange={(e) => {
//             setUser(e.target.value);
//           }}
//         />
//       </label>
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

export default Login;
