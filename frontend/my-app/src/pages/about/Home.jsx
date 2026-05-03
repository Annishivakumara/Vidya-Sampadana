import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "../../styles/home.css";

const SERVICES = [
  {
    icon: "🎯",
    bg: "rgba(245,166,35,0.1)",
    title: "KCET Rank Predictor",
    desc: "Get an accurate rank prediction based on your marks and category. Plan your college choices before results are out.",
  },
  {
    icon: "🧬",
    bg: "rgba(99,179,237,0.1)",
    title: "NEET Updates",
    desc: "Stay on top of NEET exam dates, syllabus changes, cutoffs, and seat matrix updates — all in one place.",
  },
  {
    icon: "💬",
    bg: "rgba(167,139,250,0.1)",
    title: "Student Chat",
    desc: "Connect with peers, ask doubts, and get guidance from seniors who cracked KCET and NEET.",
  },
  {
    icon: "🔔",
    bg: "rgba(52,211,153,0.1)",
    title: "Smart Notifications",
    desc: "Never miss a deadline. Get personalised alerts for counselling rounds, document uploads, and key dates.",
  },
  {
    icon: "📊",
    bg: "rgba(251,146,60,0.1)",
    title: "Analytics Dashboard",
    desc: "Track your preparation progress, mock test scores, and compare with other students statewide.",
  },
  {
    icon: "💳",
    bg: "rgba(236,72,153,0.1)",
    title: "Easy Payments",
    desc: "Pay counselling and registration fees securely through our integrated payment gateway.",
  },
];

const Home = () => {
  return (
    <div>
      {/* ── NAVBAR ── */}
      <nav className="hn-nav">
        <Link to="/" className="hn-brand">
          <img src={logo} alt="Vidya Sampadana Logo" className="hn-logo" />
          <span className="hn-org">
            Vidya <span>Sampadana</span>
          </span>
        </Link>

        <ul className="hn-nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="hn-nav-cta">
          <Link to="/login" className="hn-btn-outline">Login</Link>
          <Link to="/register" className="hn-btn-solid">Register</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hn-hero">
        <div className="hn-hero-inner">
          {/* Left */}
          <div className="hn-hero-left">
            <div className="hn-badge">
              <span className="hn-badge-dot" />
              Karnataka's #1 Exam Portal
            </div>

            <h1 className="hn-hero-title">
              Your Dream College <br />
              Starts <span className="gold">Here.</span>
            </h1>

            <div className="hn-hero-exams">
              <span className="hn-exam-tag kcet">KCET 2025</span>
              <span className="hn-exam-tag neet">NEET UG 2025</span>
            </div>

            <p className="hn-hero-desc">
              Vidya Sampadana helps Karnataka students navigate KCET and NEET
              with rank prediction, real-time updates, peer support, and
              everything you need to secure your seat.
            </p>

            <div className="hn-hero-actions">
              <Link to="/register" className="hn-cta-primary">
                Get Started Free →
              </Link>
              <Link to="/login" className="hn-cta-secondary">
                Already a member
              </Link>
            </div>

            <div className="hn-stats">
              <div>
                <div className="hn-stat-num">12,000+</div>
                <div className="hn-stat-label">Students enrolled</div>
              </div>
              <div>
                <div className="hn-stat-num">98%</div>
                <div className="hn-stat-label">Rank accuracy</div>
              </div>
              <div>
                <div className="hn-stat-num">500+</div>
                <div className="hn-stat-label">Colleges covered</div>
              </div>
            </div>
          </div>

          {/* Right — student image */}
          <div className="hn-hero-right">
            <div className="hn-student-wrap">
              <img
                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80"
                alt="Student"
                className="hn-student-img"
              />
              <div className="hn-float-card card1">
                <span className="hn-float-icon">🏆</span>
                Rank Predicted Successfully
              </div>
              <div className="hn-float-card card2">
                <span className="hn-float-icon">📚</span>
                NEET Cutoff Updated
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="hn-services" id="services">
        <p className="hn-section-label">What We Offer</p>
        <h2 className="hn-section-title">Everything You Need to Succeed</h2>
        <p className="hn-section-sub">
          From rank prediction to counselling support — we've got every step of
          your KCET and NEET journey covered.
        </p>
        <div className="hn-services-grid">
          {SERVICES.map((s) => (
            <div className="hn-service-card" key={s.title}>
              <div className="hn-service-icon" style={{ background: s.bg }}>
                {s.icon}
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="hn-footer" id="contact">
        <div className="hn-footer-inner">
          <div className="hn-footer-brand">
            <Link to="/" className="hn-brand" style={{ marginBottom: 0 }}>
              <img src={logo} alt="logo" className="hn-logo" />
              <span className="hn-org" style={{ fontSize: 16 }}>
                Vidya <span>Sampadana</span>
              </span>
            </Link>
            <p>
              Empowering Karnataka students to make informed decisions about
              their higher education through technology and community.
            </p>
            <div className="hn-social">
              <a href="#" className="hn-social-btn" aria-label="Instagram">📸</a>
              <a href="#" className="hn-social-btn" aria-label="Twitter">🐦</a>
              <a href="#" className="hn-social-btn" aria-label="YouTube">▶️</a>
              <a href="#" className="hn-social-btn" aria-label="WhatsApp">💬</a>
            </div>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><a href="#services">Services</a></li>
            </ul>
          </div>

          <div>
            <h4>Exams</h4>
            <ul>
              <li><a href="#">KCET 2025</a></li>
              <li><a href="#">NEET UG 2025</a></li>
              <li><a href="#">Rank Predictor</a></li>
              <li><a href="#">Counselling Guide</a></li>
            </ul>
          </div>

          <div>
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="hn-footer-bottom">
          <span>© 2025 Vidya Sampadana. All rights reserved.</span>
          <span>Made with ❤️ for Karnataka students</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;