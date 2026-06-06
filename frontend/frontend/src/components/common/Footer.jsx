import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="#1a3cff" />
                <path d="M8 22L16 10L24 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 18H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>Vidya<em>Sampadana</em></span>
            </div>
            <p className="footer__tagline">
              Empowering students through modern digital education management.
            </p>
          </div>

          {/* Navigation */}
          <div className="footer__col">
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/students">Students</Link></li>
            </ul>
          </div>

          {/* Platform */}
          <div className="footer__col">
            <h4>Platform</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#get-started">Get Started</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {currentYear} VidyaSampadana. All rights reserved.</p>
          <p className="footer__tech">Built with React + Vite</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
