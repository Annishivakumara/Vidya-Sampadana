import React from "react";
import { Link } from "react-router-dom";
import "./Features.css";

const features = [
  {
    category: "Core Registry",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
        <path
          d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Student Directory & CRUD",
    desc: "Register, search, update, and maintain detailed student academic profiles with structured department and contact records.",
    linkTo: "/students",
    linkLabel: "Manage Students",
    tone: "blue",
  },
  {
    category: "Academic Monitoring",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Academic Record Tracking",
    desc: "Review individual student enrollment details, course progress, and academic milestones in a unified record view.",
    linkTo: "/students",
    linkLabel: "View Records",
    tone: "emerald",
  },
  {
    category: "Exam Readiness",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "KCET & NEET Guidance Ecosystem",
    desc: "Dedicated microservice modules designed to support competitive examination announcements, updates, and academic guidance.",
    tone: "amber",
  },
  {
    category: "Mentorship",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Volunteer & Team Coordination",
    desc: "Organize core leadership and volunteer contributors across technical, content, outreach, and student mentoring domains.",
    linkTo: "/about",
    linkLabel: "About Our Mission",
    tone: "blue",
  },
  {
    category: "Security & IAM",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Role-Based Access Control",
    desc: "JWT-authenticated sessions separating Student, Volunteer, and Administrator workflows through the IAM service.",
    tone: "emerald",
  },
  {
    category: "Infrastructure",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Spring Cloud Gateway Integration",
    desc: "Distributed Spring Boot microservices registered via Eureka and unified behind a single API Gateway on port 8080.",
    tone: "amber",
  },
];

const Features = () => {
  return (
    <section
      className="features section"
      id="features"
      aria-labelledby="features-heading"
    >
      <div className="container">
        <div className="features__header">
          <div className="badge">
            <span className="badge-dot" aria-hidden="true" />
            Platform Capabilities
          </div>
          <h2 id="features-heading" className="features__title">
            Structured tools for <span>academic administration</span>
          </h2>
          <p className="features__subtitle">
            Every module in Vidya Sampadana is purpose-built to keep student
            records accurate, accessible, and secure across the institution.
          </p>
        </div>

        <div className="features__grid">
          {features.map((f) => (
            <article className="feature-card" key={f.title}>
              <div className="feature-card__top">
                <div
                  className={`feature-card__icon feature-card__icon--${f.tone}`}
                >
                  {f.icon}
                </div>
                <span className="feature-card__category">{f.category}</span>
              </div>

              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.desc}</p>

              {f.linkTo && (
                <div className="feature-card__footer">
                  <Link to={f.linkTo} className="feature-card__link">
                    <span>{f.linkLabel}</span>
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
