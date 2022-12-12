import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !password)
        throw new Error("please fill all the fields");
      await axios.post(
        "/api/register",
        { name, email, password },
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
              <h1>Registration</h1>
              <div>
                {/* <img src={profile} alt="emial" className="email" /> */}
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="fill"
                  onChange={(e) => setName(e.target.value)}
                  required={"true"}
                />
              </div>
              <div className="mail-id">
                {/* <img src={mail} alt="emial" className="email" /> */}
                <input
                  type="email"
                  placeholder="Enter Email-id"
                  className="fill"
                  onChange={(e) => setEmail(e.target.value)}
                  required={"true"}
                />
              </div>
              <div className="mail-id">
                {/* <img src={lock} alt="emial" className="email" /> */}
                <input
                  type="password"
                  placeholder="Enter New Password"
                  className="fill"
                  onChange={(e) => setPassword(e.target.value)}
                  required={"true"}
                />
              </div>

              <div className="login-btn">
                <button type="submit" onClick={submitHandler}>
                  Register
                </button>
              </div>
              <div className="reg-link">
                <p>If Account exist then</p>
                <Link className="link" to="/login">
                  <li>Login!!!</li>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Register;
