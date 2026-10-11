import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="Vidya Sampadana Home">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect width="32" height="32" rx="8" fill="#1D4ED8" />
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
              <span>
                Vidya<em>Sampadana</em>
              </span>
            </Link>
            <p className="footer__tagline">
              Empowering students through structured digital scholarship, mentorship, and academic record management.
            </p>
          </div>

          {/* Navigation */}
          <nav className="footer__col" aria-label="Footer navigation">
            <h4>Navigation</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/students">Student Directory</Link>
              </li>
              <li>
                <Link to="/exam-updates">Exam Updates (KCET &amp; NEET)</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
            </ul>
          </nav>

          {/* Platform */}
          <nav className="footer__col" aria-label="Platform sections">
            <h4>Platform</h4>
            <ul>
              <li>
                <Link to="/#features">Core Features</Link>
              </li>
              <li>
                <Link to="/kcet-updates">KCET Bulletins</Link>
              </li>
              <li>
                <Link to="/neet-updates">NEET Bulletins</Link>
              </li>
              <li>
                <Link to="/students">Manage Records</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer__bottom">
          <p>© {currentYear} Vidya Sampadana Foundation. All rights reserved.</p>
          <p className="footer__tech">Academic &amp; Student Empowerment Platform</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
