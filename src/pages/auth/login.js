import axios from "axios";
import React from "react";
import { useRef, useState, useEffect } from "react";
import "./login.css";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const RegistrationForm = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [email, setEmail] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  //validate user
  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
  }, [pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <section className="form-container">
      <img src=" " />
      <div className="container">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
          {errMsg}
        </p>
        <h5 id="topic">
          Access and manage your business activities <br />
          from this ERP account.
        </h5>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-item">
            <label htmlFor="username">Name</label>
            <input
              type="text"
              id="username"
              placeholder="Company name"
              ref={userRef}
              autoComplete="off"
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
          </div>

          <div className="form-item">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              ref={userRef}
              autoComplete="off"
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
          </div>

          <div className="form-item">
            <label htmlFor="password">Password</label>
            <div>
              <input
                type="password"
                id="password"
                placeholder="Password"
                ref={userRef}
                autoComplete="off"
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
              <img src="" />
            </div>
          </div>

          <div id="terms">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              By clicking on this you agree to the
              <span className="red">
                Terms, Conditions, and Privacy Policy.
              </span>
            </label>
          </div>

          <div>
            <button id="btn" type="submit">
              SIGN UP
            </button>
          </div>

          <p id="center">
            Already have an account?<span className="red"> Log in</span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;