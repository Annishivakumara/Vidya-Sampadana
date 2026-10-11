import React, { useState } from "react";
import { studentService } from "../../services/studentService1";
import { volunteerService } from "../../services/volunteerService";
import { adminService } from "../../services/adminService";
import "./Login.css";
import "./Register.css";

const ROLE_OPTIONS = [
  {
    value: "STUDENT",
    label: "Student",
    description: "Access scholarship tracking, mentorship, and exam updates.",
  },
  {
    value: "VOLUNTEER",
    label: "Volunteer / Mentor",
    description: "Guide students and contribute domain expertise.",
  },
  {
    value: "ADMIN",
    label: "Admin",
    description: "Manage institutional records and program operations.",
  },
];

const Register = ({ onNavigateToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
    institutionName: "",
    expertise: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name] || errors.global) {
      setErrors((prev) => ({ ...prev, [name]: "", global: "" }));
    }
  };

  const handleRoleSelect = (roleValue) => {
    setFormData((prev) => ({
      ...prev,
      role: roleValue,
    }));
    if (errors.institutionName || errors.expertise || errors.global) {
      setErrors((prev) => ({
        ...prev,
        institutionName: "",
        expertise: "",
        global: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");
    setLoading(true);

    // Core fields required by all structures
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
    };

    try {
      let data;

      // Execute registration using the proper isolated service layer file
      if (formData.role === "STUDENT") {
        payload.institutionName = formData.institutionName.trim();
        data = await studentService.register(payload);
      } else if (formData.role === "VOLUNTEER") {
        payload.expertise = formData.expertise.trim();
        data = await volunteerService.register(payload);
      } else if (formData.role === "ADMIN") {
        data = await adminService.register(payload);
      }

      const registeredName = data?.name || payload.name;
      setSuccessMessage(`Registration successful! Welcome, ${registeredName}.`);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "STUDENT",
        institutionName: "",
        expertise: "",
      });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const responseData = err.response.data;
        if (responseData && typeof responseData === "object" && responseData.validationErrors) {
          setErrors(responseData.validationErrors);
        } else if (responseData && typeof responseData === "object" && responseData.message) {
          setErrors({ global: responseData.message });
        } else if (typeof responseData === "string" && responseData.trim()) {
          setErrors({ global: responseData });
        } else {
          setErrors({ global: "Please check the highlighted form fields and try again." });
        }
      } else {
        setErrors({
          global:
            err.response?.data?.message ||
            "Network communication error. Check your backend status layer.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const activeRoleMeta =
    ROLE_OPTIONS.find((item) => item.value === formData.role) || ROLE_OPTIONS[0];

  return (
    <div className="login-page">
      <div className="login-bg" aria-hidden="true">
        <div className="login-bg__grid" />
      </div>

      <main className="login-container register-container" aria-labelledby="register-heading">
        <div className="login-card register-card">
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

            <h1 id="register-heading" className="login-card__title">
              Create an account
            </h1>
            <p className="login-card__subtitle">
              Join Vidya Sampadana to access mentorship and educational tracking programs.
            </p>
          </div>

          {successMessage && (
            <div className="register-success-alert" role="status" aria-live="polite">
              <div className="register-success-alert__content">
                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{successMessage}</span>
              </div>
              <button
                type="button"
                className="register-success-alert__action"
                onClick={onNavigateToLogin}
              >
                Proceed to Sign In
              </button>
            </div>
          )}

          {errors.global && (
            <div className="login-error" role="alert" aria-live="assertive">
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{errors.global}</span>
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {/* Role Selection Field */}
            <div className="login-field">
              <label htmlFor="role">Register As</label>

              {/* Segmented Role Selector for quick visual selection */}
              <div className="register-role-tabs" role="group" aria-label="Account role selection">
                {ROLE_OPTIONS.map((option) => {
                  const isSelected = formData.role === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={`register-role-tab ${
                        isSelected ? "register-role-tab--active" : ""
                      }`}
                      onClick={() => handleRoleSelect(option.value)}
                      aria-pressed={isSelected}
                      disabled={loading}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>

              {/* Preserved select control for full form & assistive compatibility */}
              <div className="login-input-wrap">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="register-select"
                  aria-describedby="role-helper-text"
                  disabled={loading}
                >
                  <option value="STUDENT">Student</option>
                  <option value="VOLUNTEER">Volunteer / Mentor</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <span id="role-helper-text" className="register-role-helper">
                {activeRoleMeta.description}
              </span>
            </div>

            {/* Name Field */}
            <div className="login-field">
              <label htmlFor="name">Full Name</label>
              <div className="login-input-wrap">
                <svg className="login-input-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M10 10a4 4 0 100-8 4 4 0 000 8zm-6 8a6 6 0 1112 0H4z"
                    fill="currentColor"
                  />
                </svg>
                <input
                  id="name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  disabled={loading}
                  required
                />
              </div>
              {errors.name && (
                <span id="name-error" className="register-error-text" role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            {/* Email Field */}
            <div className="login-field">
              <label htmlFor="email">Email Address</label>
              <div className="login-input-wrap">
                <svg className="login-input-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                    fill="currentColor"
                  />
                  <path
                    d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                    fill="currentColor"
                  />
                </svg>
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  disabled={loading}
                  required
                />
              </div>
              {errors.email && (
                <span id="email-error" className="register-error-text" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Password Field */}
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
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
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
              {errors.password && (
                <span id="password-error" className="register-error-text" role="alert">
                  {errors.password}
                </span>
              )}
            </div>

            {/* Dynamic Field: Student Option */}
            {formData.role === "STUDENT" && (
              <div className="login-field dynamic-field-fade">
                <label htmlFor="institutionName">Institution / College Name</label>
                <div className="login-input-wrap">
                  <svg className="login-input-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                      d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z"
                      fill="currentColor"
                    />
                  </svg>
                  <input
                    id="institutionName"
                    type="text"
                    name="institutionName"
                    autoComplete="organization"
                    placeholder="e.g. Presidency University"
                    value={formData.institutionName}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.institutionName)}
                    aria-describedby={errors.institutionName ? "institutionName-error" : undefined}
                    disabled={loading}
                    required
                  />
                </div>
                {errors.institutionName && (
                  <span id="institutionName-error" className="register-error-text" role="alert">
                    {errors.institutionName}
                  </span>
                )}
              </div>
            )}

            {/* Dynamic Field: Volunteer Option */}
            {formData.role === "VOLUNTEER" && (
              <div className="login-field dynamic-field-fade">
                <label htmlFor="expertise">Area of Expertise</label>
                <div className="login-input-wrap">
                  <svg className="login-input-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                    <path
                      d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"
                      fill="currentColor"
                    />
                  </svg>
                  <input
                    id="expertise"
                    type="text"
                    name="expertise"
                    placeholder="e.g. Java, NEET Counseling, Mathematics"
                    value={formData.expertise}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.expertise)}
                    aria-describedby={errors.expertise ? "expertise-error" : undefined}
                    disabled={loading}
                    required
                  />
                </div>
                {errors.expertise && (
                  <span id="expertise-error" className="register-error-text" role="alert">
                    {errors.expertise}
                  </span>
                )}
              </div>
            )}

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <span className="login-btn__spinner" aria-hidden="true" />
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Register Account</span>
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

          {/* Back to Login View Switcher */}
          <div className="login-card__footer">
            <div className="login-card__register-prompt">
              <span>Already have an account?</span>
              <button
                type="button"
                className="login-link-btn"
                onClick={onNavigateToLogin}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
