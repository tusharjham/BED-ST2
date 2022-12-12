import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (email.length == 0 || password.length == 0)
        throw new Error("please fill all the fields");
      await axios.post(
        "/api/login",
        { email, password },
        { headers: { "Content-type": "application/json" } }
      );
      navigate("/home");
    } catch (err) {
      let error;
      if (err.response == undefined) {
        error = err.toString();
      } else {
        error = err.response.data;
      }
      alert(error);
    }
  };
  return (
    <form>
      <div className="main">
        <div className="sub-main">
          <div>
            <div>
              <h1 className="LHeader">Login</h1>
              <div>
                <input
                  type="email"
                  placeholder="Enter Email-id"
                  className="fill"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="second-input">
                {/* <img src={lock} alt="password" className="email" /> */}
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="fill"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <div className="login-btn">
                <button type="submit" onClick={submitHandler}>
                  Login
                </button>
              </div>
              <div className="reg-link">
                <Link className="link" to="/registration">
                  <li>Register Now</li>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
