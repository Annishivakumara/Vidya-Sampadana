import React, { useState } from 'react';
import axios from 'axios';
import { studentService } from '../../services/studentService1';
import { volunteerService } from '../../services/volunteerService';
import { adminService } from '../../services/adminService';
import './Register.css';

const Register = ({ onNavigateToLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'STUDENT', 
        institutionName: '', 
        expertise: ''        
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage('');
        setLoading(true);

        // Core fields required by all structures
        let payload = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        };

        try {
            let data;
            
            // Execute registration using the proper isolated service layer file
            if (formData.role === 'STUDENT') {
                payload.institutionName = formData.institutionName;
                data = await studentService.register(payload);
            } else if (formData.role === 'VOLUNTEER') {
                payload.expertise = formData.expertise;
                data = await volunteerService.register(payload);
            } else if (formData.role === 'ADMIN') {
                data = await adminService.register(payload);
            }

            setSuccessMessage(`Registration successful! Welcome, ${data.name}.`);
            setFormData({ name: '', email: '', password: '', role: 'STUDENT', institutionName: '', expertise: '' });
        } catch (err) {
            // Check if the backend custom exception layer returned validation errors
            if (err.response && err.response.status === 400) {
                const backendErrors = err.response.data.validationErrors || {};
                setErrors(backendErrors);
            } else {
                setErrors({ global: 'Network communication error. Check your backend status layer.' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page"> {/* Reuse page-wrapper structure for consistent layout spacing */}
            {/* Background decoration matching Login */}
            <div className="login-bg">
                <div className="login-bg__blob login-bg__blob--1" />
                <div className="login-bg__blob login-bg__blob--2" />
                <div className="login-bg__grid" />
            </div>

            <div className="login-card">
                {/* Logo Section */}
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

                <h1 className="login-card__title">Create an account</h1>
                <p className="login-card__subtitle">Join us to access mentorship and educational tracking programs.</p>

                {successMessage && <div className="register-success-alert">{successMessage}</div>}
                {errors.global && <div className="login-error">{errors.global}</div>}

                <form className="login-form" onSubmit={handleSubmit}>
                    
                    {/* Role Selection Field */}
                    <div className="login-field">
                        <label htmlFor="role">Register As</label>
                        <div className="login-input-wrap">
                            <select id="role" name="role" value={formData.role} onChange={handleChange} className="register-select">
                                <option value="STUDENT">Student</option>
                                <option value="VOLUNTEER">Volunteer / Mentor</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                    </div>

                    {/* Name Field */}
                    <div className="login-field">
                        <label htmlFor="name">Full Name</label>
                        <div className="login-input-wrap">
                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Enter full name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {errors.name && <span className="register-error-text">{errors.name}</span>}
                    </div>

                    {/* Email Field */}
                    <div className="login-field">
                        <label htmlFor="email">Email Address</label>
                        <div className="login-input-wrap">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter email address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {errors.email && <span className="register-error-text">{errors.email}</span>}
                    </div>

                    {/* Password Field */}
                    <div className="login-field">
                        <label htmlFor="password">Password</label>
                        <div className="login-input-wrap">
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Create secure password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {errors.password && <span className="register-error-text">{errors.password}</span>}
                    </div>

                    {/* Dynamic Field: Student Option */}
                    {formData.role === 'STUDENT' && (
                        <div className="login-field dynamic-field-fade">
                            <label htmlFor="institutionName">Institution / College Name</label>
                            <div className="login-input-wrap">
                                <input
                                    id="institutionName"
                                    type="text"
                                    name="institutionName"
                                    placeholder="e.g. Presidency University"
                                    value={formData.institutionName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {errors.institutionName && <span className="register-error-text">{errors.institutionName}</span>}
                        </div>
                    )}

                    {/* Dynamic Field: Volunteer Option */}
                    {formData.role === 'VOLUNTEER' && (
                        <div className="login-field dynamic-field-fade">
                            <label htmlFor="expertise">Area of Expertise</label>
                            <div className="login-input-wrap">
                                <input
                                    id="expertise"
                                    type="text"
                                    name="expertise"
                                    placeholder="e.g. Java, NEET Counseling"
                                    value={formData.expertise}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {errors.expertise && <span className="register-error-text">{errors.expertise}</span>}
                        </div>
                    )}

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? (
                            <span className="login-btn__spinner" />
                        ) : (
                            <>Register Account</>
                        )}
                    </button>
                </form>

                {/* Back to Login View Switcher */}
                <div className="login-card__register-prompt">
                    <span>Already have an account?</span>
                    <button type="button" className="login-link-btn" onClick={onNavigateToLogin}>
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;