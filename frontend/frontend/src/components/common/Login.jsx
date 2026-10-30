import React, { useState } from "react";
import "./Login.css";
import { userService } from "../../services/userService";

const Login = ({ onLogin, onNavigateToRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const authenticatedUser = await userService.login(username.trim(), password);
      onLogin(authenticatedUser);
    } catch (err) {
      setError(err.message || "Invalid credentials. Please check your username and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg" aria-hidden="true">
        <div className="login-bg__grid" />
      </div>

      <main className="login-container" aria-labelledby="login-heading">
        <div className="login-card">
          {/* Brand Header */}
          <div className="login-card__header">
            <div className="login-card__logo">
              <div className="login-card__logo-icon" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="8" fill="var(--clr-primary)" />
                  <path
                    d="M8 22L16 10L24 22"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 18H21"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="login-card__logo-text">
                Vidya<span>Sampadana</span>
              </span>
            </div>

            <h1 id="login-heading" className="login-card__title">
              Sign in to your account
            </h1>
            <p className="login-card__subtitle">
              Access student academic records, mentorship programs, and competitive exam updates.
            </p>
          </div>

          {error && (
            <div className="login-error" role="alert" aria-live="assertive">
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="login-field">
              <label htmlFor="username">Username or Email</label>
              <div className="login-input-wrap">
                <svg className="login-input-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M10 10a4 4 0 100-8 4 4 0 000 8zm-6 8a6 6 0 1112 0H4z"
                    fill="currentColor"
                  />
                </svg>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your username or email"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError("");
                  }}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>
              <div className="login-input-wrap login-input-wrap--password">
                <svg className="login-input-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z"
                    fill="currentColor"
                  />
                </svg>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  tabIndex={0}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3l14 14M10.584 10.587a2 2 0 002.828 2.83M9.363 5.365A9.466 9.466 0 0110 5c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.563 3.029m-2.14 2.14A9.953 9.953 0 0110 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 012.458-4.132"
                      />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M1.458 10C2.732 5.943 6.523 3 10 3s7.268 2.943 8.542 7c-1.274 4.057-5.064 7-8.542 7s-7.268-2.943-8.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading || !username.trim() || !password}
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <span className="login-btn__spinner" aria-hidden="true" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="login-card__footer">
            <div className="login-card__register-prompt">
              <span>New to Vidya Sampadana?</span>
              <button
                type="button"
                className="login-link-btn"
                onClick={onNavigateToRegister}
              >
                Create an account
              </button>
            </div>
          </div>
        </div>

        <p className="login-card__hint">Use the account credentials you registered.</p>
      </main>
    </div>
  );
};

export default Login;
