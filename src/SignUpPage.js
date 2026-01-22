import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import pic from './img1.jpg';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      alert("Please fill all the fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (!formData.terms) {
      alert("You must agree to the terms and conditions.");
      return;
    }
    alert("Form submitted successfully!");
  };

  return (
    <div className="container">
      <form className="form" name="myForm" onSubmit={validateForm}>
        <h2>Sign Up</h2>
        <input
          type="text"
          className="box"
          name="username"
          placeholder="Enter Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          className="box"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          className="box"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          className="box"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <div className="terms">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            className="check"
          />
          <label htmlFor="terms">I hereby agree to the terms and conditions.</label>
        </div>
        <input type="submit" value="Sign Up" id="submit" />
        <div className="form-links">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
        <Link to="/" className="back-home">Back to Home</Link>
      </form>
      <div className="side">
        <img src={pic} alt="Signup Side" />
      </div>
    </div>
  );
};

export default SignUpPage;