import React from "react";
import "./Features.css";

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Student Management",
    desc: "Register, update, and track students with ease. Full CRUD operations with a clean interface.",
    color: "#1a3cff",
    bg: "rgba(26,60,255,.06)",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Progress Tracking",
    desc: "Monitor academic progress and performance metrics across departments and semesters.",
    color: "#10b981",
    bg: "rgba(16,185,129,.06)",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Learning Resources",
    desc: "Centralized repository for course materials, assignments, and supplementary resources.",
    color: "#f59e0b",
    bg: "rgba(245,158,11,.06)",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Volunteer Coordination",
    desc: "Manage volunteers, assign tasks, and coordinate educational support programs efficiently.",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,.06)",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Secure Access",
    desc: "Role-based authentication ensuring data security and privacy for all users.",
    color: "#ef4444",
    bg: "rgba(239,68,68,.06)",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Cloud Ready",
    desc: "Built on modern infrastructure with REST API integration for seamless data sync.",
    color: "#06b6d4",
    bg: "rgba(6,182,212,.06)",
  },
];

const Features = () => {
  return (
    <section className="features section" id="features" aria-label="Features">
      <div className="container">
        <div className="features__header">
          <div className="badge">
            <span className="badge-dot" />
            Platform Features
          </div>
          <h2 className="features__title">
            Everything you need to <span>manage learning</span>
          </h2>
          <p className="features__subtitle">
            A comprehensive suite of tools designed for modern educational institutions.
          </p>
        </div>

        <div className="features__grid">
          {features.map((f, i) => (
            <div
              className="feature-card"
              key={f.title}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="feature-card__icon" style={{ background: f.bg, color: f.color }}>
                {f.icon}
              </div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
