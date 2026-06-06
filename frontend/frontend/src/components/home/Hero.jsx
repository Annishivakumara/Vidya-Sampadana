import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const illustrationRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = illustrationRef.current;
    if (!el) return;
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className={`hero ${visible ? "hero--visible" : ""}`} aria-label="Hero Section">
      {/* Background */}
      <div className="hero__blob hero__blob--1" aria-hidden="true" />
      <div className="hero__blob hero__blob--2" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />

      <div className="hero__container container">
        {/* LEFT — Text */}
        <div className="hero__content">
          <div className="badge hero__badge">
            <span className="badge-dot" />
            Digital Education Platform
          </div>

          <h1 className="hero__heading">
            <span className="hero__heading-line">Vidya</span>
            <span className="hero__heading-line hero__heading-accent">Sampadana</span>
          </h1>

          <p className="hero__sub">
            Empowering students through modern digital education management.
          </p>

          <p className="hero__desc">
            A modern platform designed to simplify student management, learning
            resources, volunteer coordination, and academic progress tracking.
          </p>

          <div className="hero__actions">
            <Link to="/students" className="hero__btn hero__btn--primary">
              Manage Students
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <a href="#features" className="hero__btn hero__btn--secondary">
              Explore Features
            </a>
          </div>

          {/* Stats */}
          <div className="hero__stats">
            {[
              { value: "2,400+", label: "Students" },
              { value: "180+", label: "Volunteers" },
              { value: "95%", label: "Progress Rate" },
            ].map((stat, i) => (
              <React.Fragment key={stat.label}>
                {i > 0 && <div className="hero__stat-divider" aria-hidden="true" />}
                <div className="hero__stat">
                  <span className="hero__stat-value">{stat.value}</span>
                  <span className="hero__stat-label">{stat.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* RIGHT — Illustration */}
        <div className="hero__illustration" ref={illustrationRef} aria-hidden="true">
          <div className="hero__illu-card hero__illu-card--main">
            <div className="hero__illu-avatar" />
            <div>
              <div className="hero__illu-line hero__illu-line--bold" />
              <div className="hero__illu-line" style={{ width: "60%" }} />
            </div>
            <div className="hero__illu-badge">Active</div>
          </div>

          <div className="hero__illu-card hero__illu-card--stat">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 20V10M6 20V14M18 20V4" stroke="#1a3cff" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <div>
              <div className="hero__illu-num">2,400</div>
              <div className="hero__illu-sub">Students enrolled</div>
            </div>
          </div>

          <div className="hero__illu-card hero__illu-card--progress">
            <span>Progress Rate</span>
            <div className="hero__illu-bar">
              <div className="hero__illu-bar-fill" style={{ width: "95%" }} />
            </div>
            <span className="hero__illu-pct">95%</span>
          </div>

          {/* Decorative ring */}
          <div className="hero__illu-ring" />
          <div className="hero__illu-dot hero__illu-dot--1" />
          <div className="hero__illu-dot hero__illu-dot--2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
