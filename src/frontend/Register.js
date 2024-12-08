import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
// import Validation from "./SignupValidation";
import axios from "axios";

function Register() {

  const [name,setName] = useState()
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()

  const navigate=useNavigate()

  const handleSubmit =(e) =>{
    e.preventDefault()
    axios.post('http://localhost:3000/register',{name,email,password})
    .then(result=> {console.log(result)
      navigate('/Login')
    })
    .catch(err=> console.log(err))
  }
 
  return (
    <div className="main_div pt-5">
      <div className="form_space">
        <h3 style={{ textAlign: "center", color: "black" }}>Register your account</h3>
        <form action="" onSubmit={handleSubmit} className="form-space" style={{ marginTop: "50px" }}>
          <div className="form-group">
            <label
              style={{ color: "black", padding: "5px" }}
              for="exampleInputUsername">
              USERNAME
            </label>
            <input
            required
              type="text"
              name="name"
              onChange={(e)=>setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Username"></input>
          </div>
          <br></br>
          <div className="form-group">
            <label
              style={{ color: "black", padding: "5px" }}
              for="exampleInputUsername" >
              EMAIL
            </label>
            <input
            required
              type="email"
              name="email"
              onChange={(e)=>setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Email"></input>
          </div>
          <br></br>
          <div className="form-group">
            <label
              style={{ color: "black", padding: "5px" }}
              for="exampleInputPassword1">
              PASSWORD
            </label>
            <input
            required
              type="password"
              name="password"
              onChange={(e)=>setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"></input>
          </div>
          <br></br>
          <br></br>
          <button
            style={{ marginLeft: "5%", width: "90%" }}
            type="submit"
            className="btn btn-primary">
            Register
          </button>
        </form>
        <br></br>
        <hr style={{ color: "black" }}></hr>
        <br></br>
        <Link to="/Login">
          <button
            style={{ marginLeft: "5%", width: "90%" }}
            type="submit"
            className="btn btn-outline-primary">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Register;
