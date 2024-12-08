import React, { useState } from "react";
import "./Verifier.css"; 
import { Link,useNavigate } from "react-router-dom";
import "./VerifierDashboard"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Predefined credentials for demo
  const predefinedUser = {
    email: "admin@gmail.com",
    password: "admin123",
  };
  
  const navigate=useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    setError("");
    setSuccess("");

    // Validate credentials
    if (email === predefinedUser.email && password === predefinedUser.password) {
      setSuccess("Login successful!");
      navigate('/VerifierDashboard')
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="page">
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        
        <button type="submit">Login</button>
       
        
      </form>
    </div>
    </div>
  );
};

export default Login;








