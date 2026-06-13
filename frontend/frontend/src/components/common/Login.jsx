import React, { useState } from "react";
import "./Login.css";
import { userService } from "../../services/userService";

const Login = ({ onLogin, onNavigateToRegister }) => { // 1. Accept the navigation prop
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    // Hit your central service layer using the form states (rename your 'username' state to 'email')
    const authenticatedUser = await userService.login(username, password);
    
    // Pass the real profile payload straight up to App.jsx state wrapper
    onLogin(authenticatedUser);
  } catch (err) {
    setError(err.message || "Invalid credentials. Please register an account first.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-page">
      {/* Background decoration */}
      <div className="login-bg">
        <div className="login-bg__blob login-bg__blob--1" />
        <div className="login-bg__blob login-bg__blob--2" />
        <div className="login-bg__grid" />
      </div>

      <div className="login-card">
        {/* Logo */}
        <div className="login-card__logo">
          <div className="login-card__logo-icon">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#1a3cff" />
              <path d="M8 22L16 10L24 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11 18H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="login-card__logo-text">Vidya<span>Sampadana</span></span>
        </div>

        <h1 className="login-card__title">Welcome back</h1>
        <p className="login-card__subtitle">Sign in to manage your students and programs.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="email">Email Address</label>
            <div className="login-input-wrap">
              <svg className="login-input-icon" viewBox="0 0 20 20" fill="none">
                <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-6 8a6 6 0 1112 0H4z" fill="currentColor"/>
              </svg>
              <input
                id="email"
                type="email"
                placeholder="Enter Your email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>
            <div className="login-input-wrap">
              <svg className="login-input-icon" viewBox="0 0 20 20" fill="none">
                <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z" fill="currentColor"/>
              </svg>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <div className="login-error">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? (
              <span className="login-btn__spinner" />
            ) : (
              <>Sign In <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg></>
            )}
          </button>
        </form>

        {/* 2. Added navigation redirection link */}
        <div className="login-card__register-prompt">
          <span>New to the platform?</span>
          <button type="button" className="login-link-btn" onClick={onNavigateToRegister}>
            Create an account
          </button>
        </div>

        <p className="login-card__hint">Demo credentials: <strong>admin</strong> / <strong>password</strong></p>
      </div>
    </div>
  );
};

export default Login;