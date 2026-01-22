import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter both username and password');
      return;
    }
    
    // In a real app, you would make an API call to your backend here
    // For demo purposes, we'll just simulate a successful login
    localStorage.setItem('isLoggedIn', 'true');
    
    // Redirect to homepage after login
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
      
      <div className="login-form-container">
        <h1>Login to BookVerse</h1>
        
        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          
          <button type="submit" className="login-button">Log In</button>
        </form>
        
        <div className="register-link">
          <p>Don't have an account? <Link to="#">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;