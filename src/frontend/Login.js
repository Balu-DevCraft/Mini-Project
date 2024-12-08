import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { notification, Button } from "antd";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make POST request to login endpoint
      const result = await axios.post("http://localhost:3000/Login", {
        email,
        password,
      });

      console.log(result.data);

      // Check response and navigate
      if (result.data.message === "Login successful.") {
        navigate('/Mainpage');
      } else {
        alert(result.data); // Show error message from server
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };
  const openNotification = (type, message, description) => {
    notification[type]({
      message: {},
      description: description,
      placement: "topRight", // Position: topRight, topLeft, bottomRight, bottomLeft
      duration: 3, // Duration in seconds
    });
  };
  return (
    <div className="main_div pt-4">
      <div className="form_space">
        <h3 style={{ textAlign: "center", color: "black" }}>Login</h3>
        <form
          onSubmit={handleSubmit}
          className="form-space"
          style={{ marginTop: "50px" }}
        >
          <div className="form-group">
            <label
              htmlFor="email"
              style={{ color: "black", padding: "5px" }}
            >
              EMAIL
            </label>
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
            />
          </div>
          <br />
          <div className="form-group">
            <label
              htmlFor="password"
              style={{ color: "black", padding: "5px" }}
            >
              PASSWORD
            </label>
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
          <br />
          <button
            style={{ marginLeft: "5%", width: "90%" }}
            type="submit"
            className="btn btn-primary"
          >
            SIGN IN
          </button>
        </form>
        <br />
        <hr style={{ color: "black" }} />
        <br />
        <Link to="/Register">
          <button
            style={{ marginLeft: "5%", width: "90%" }}
            className="btn btn-outline-primary"
          >
            Register Account
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
