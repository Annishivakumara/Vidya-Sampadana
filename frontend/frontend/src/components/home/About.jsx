import React from "react";
import "./About.css";

const stats = [
  { value: "2,400+", label: "Students Enrolled" },
  { value: "180+", label: "Volunteers" },
  { value: "95%", label: "Progress Rate" },
  { value: "12+", label: "Departments" },
];

const About = () => {
  return (
    <section className="about section" id="about" aria-label="About">
      <div className="container">
        <div className="about__inner">
          {/* Left */}
          <div className="about__visual">
            <div className="about__blob" />
            <div className="about__image-card">
              <div className="about__image-graphic">
                <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="240" height="200" rx="16" fill="url(#aboutGrad)"/>
                  <circle cx="120" cy="80" r="36" fill="rgba(255,255,255,.25)"/>
                  <path d="M104 80a16 16 0 1132 0M88 110a32 32 0 0164 0" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  <rect x="40" y="148" width="160" height="8" rx="4" fill="rgba(255,255,255,.3)"/>
                  <rect x="60" y="164" width="120" height="6" rx="3" fill="rgba(255,255,255,.2)"/>
                  <defs>
                    <linearGradient id="aboutGrad" x1="0" y1="0" x2="240" y2="200" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1a3cff"/>
                      <stop offset="1" stopColor="#7c96ff"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Floating stat chips */}
              <div className="about__chip about__chip--1">
                <strong>2,400+</strong> Students
              </div>
              <div className="about__chip about__chip--2">
                ✦ Est. 2022
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="about__content">
            <div className="badge">
              <span className="badge-dot" />
              About the Platform
            </div>

            <h2 className="about__title">
              Built for the future of <span>digital education</span>
            </h2>

            <p className="about__text">
              VidyaSampadana is a comprehensive education management platform
              developed to bridge the gap between students, educators, and
              volunteers. Our mission is to simplify administrative tasks and
              enable educators to focus on what matters most — learning.
            </p>

            <p className="about__text">
              From student registration to academic progress tracking, every
              feature is designed with simplicity and efficiency in mind,
              empowering institutions of all sizes.
            </p>

            {/* Stats grid */}
            <div className="about__stats">
              {stats.map((s) => (
                <div className="about__stat" key={s.label}>
                  <span className="about__stat-val">{s.value}</span>
                  <span className="about__stat-lbl">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
