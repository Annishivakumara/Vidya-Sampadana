import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const platformHighlights = [
  {
    title: "Student Directory",
    detail: "Centralized academic profiles, enrollment status, and department records",
  },
  {
    title: "Role-Based Access",
    detail: "Dedicated registration and secure access for Students, Volunteers, and Admins",
  },
  {
    title: "Microservice Architecture",
    detail: "Unified gateway connecting student records, exam updates, and volunteer workflows",
  },
];

const Hero = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className={`hero ${visible ? "hero--visible" : ""}`}
      aria-labelledby="hero-heading"
    >
      <div className="hero__grid-bg" aria-hidden="true" />

      <div className="hero__container container">
        {/* LEFT — Editorial Mission & Primary Actions */}
        <div className="hero__content">
          <div className="badge hero__badge">
            <span className="badge-dot" aria-hidden="true" />
            Academic &amp; Student Empowerment Platform
          </div>

          <h1 id="hero-heading" className="hero__heading">
            <span className="hero__heading-line">Vidya</span>
            <span className="hero__heading-line hero__heading-accent">
              Sampadana
            </span>
          </h1>

          <p className="hero__sub">
            Structured digital management for student records, volunteer
            mentorship, and academic coordination.
          </p>

          <p className="hero__desc">
            Designed for educational foundations and academic programs to
            maintain accurate student directories, coordinate volunteer
            mentors across specialized domains, and streamline institutional
            operations through a unified portal.
          </p>

          <div className="hero__actions">
            <Link to="/students" className="hero__btn hero__btn--primary">
              <span>Open Student Directory</span>
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link to="/about" className="hero__btn hero__btn--secondary">
              Mission &amp; Governance
            </Link>
            <a href="#features" className="hero__btn hero__btn--ghost">
              Platform Capabilities
            </a>
          </div>

          {/* Institutional Pillars (Honest, verifiable system capabilities) */}
          <div className="hero__pillars" aria-label="Core institutional pillars">
            {platformHighlights.map((item) => (
              <div className="hero__pillar" key={item.title}>
                <span className="hero__pillar-title">{item.title}</span>
                <span className="hero__pillar-detail">{item.detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Structured Academic Ledger Preview */}
        <div className="hero__visual" aria-hidden="true">
          <div className="hero__panel">
            <div className="hero__panel-header">
              <div className="hero__panel-brand">
                <span className="hero__panel-dot" />
                <span className="hero__panel-title">
                  Institutional Portal Overview
                </span>
              </div>
              <span className="hero__panel-tag">Gateway Connected</span>
            </div>

            <div className="hero__panel-body">
              {/* Module 1: Student Records */}
              <div className="hero__module-card">
                <div className="hero__module-icon hero__module-icon--blue">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="9"
                      cy="7"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="hero__module-info">
                  <div className="hero__module-head">
                    <strong>Student Record Registry</strong>
                    <span className="hero__module-status">CRUD Active</span>
                  </div>
                  <p>
                    Search, register, update, and review individual academic
                    profiles and contact records.
                  </p>
                </div>
              </div>

              {/* Module 2: Volunteer & Core Team */}
              <div className="hero__module-card">
                <div className="hero__module-icon hero__module-icon--amber">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="hero__module-info">
                  <div className="hero__module-head">
                    <strong>Mentorship &amp; Guidance</strong>
                    <span className="hero__module-status hero__module-status--neutral">
                      Multi-Role
                    </span>
                  </div>
                  <p>
                    Coordinated support across Student, Volunteer, and
                    Administrative user roles.
                  </p>
                </div>
              </div>

              {/* Module 3: Competitive Exam & Service Ecosystem */}
              <div className="hero__module-card">
                <div className="hero__module-icon hero__module-icon--emerald">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="hero__module-info">
                  <div className="hero__module-head">
                    <strong>Authenticated Governance</strong>
                    <span className="hero__module-status hero__module-status--emerald">
                      IAM Protected
                    </span>
                  </div>
                  <p>
                    Centralized identity and access management backed by Spring
                    Cloud Gateway routing.
                  </p>
                </div>
              </div>
            </div>

            <div className="hero__panel-footer">
              <span>Quick Navigation:</span>
              <div className="hero__panel-links">
                <span>/students</span>
                <span>/about</span>
                <span>#features</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
