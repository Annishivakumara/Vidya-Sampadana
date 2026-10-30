import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ user, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const displayName = user?.name || user?.email || "User";
  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("") || "U";

  const roleLabel = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()
    : "Member";

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Students", path: "/students" },
    { label: "Exam Updates", path: "/exam-updates" },
    { label: "About Us", path: "/about" },
  ];

  const isRouteActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    if (path === "/exam-updates") {
      return (
        location.pathname === "/exam-updates" ||
        location.pathname === "/kcet-updates" ||
        location.pathname === "/neet-updates" ||
        location.pathname.startsWith("/exam-updates/")
      );
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo" aria-label="Vidya Sampadana Home">
          <span className="navbar__logo-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          </span>
          <span className="navbar__logo-text">
            Vidya<span>Sampadana</span>
          </span>
        </Link>

        <nav className="navbar__links" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = isRouteActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                aria-current={active ? "page" : undefined}
                className={`navbar__link ${active ? "navbar__link--active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="navbar__actions">
          {user && (
            <div className="navbar__user-card" aria-label="Signed in user profile">
              <span className="navbar__avatar" aria-hidden="true">
                {initials}
              </span>
              <div className="navbar__user-meta">
                <strong title={displayName}>{displayName}</strong>
                <small>{roleLabel}</small>
              </div>
            </div>
          )}

          <button
            type="button"
            className="navbar__logout-btn"
            onClick={onLogout}
            aria-label="Sign out of account"
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M13 7l3 3m0 0l-3 3m3-3H7m6-7H5a2 2 0 00-2 2v12a2 2 0 002 2h8"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Logout</span>
          </button>

          <button
            type="button"
            className={`navbar__hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation-drawer"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="navbar__mobile-menu"
          role="region"
          aria-label="Mobile navigation"
        >
          {user && (
            <div className="navbar__mobile-user">
              <span className="navbar__avatar navbar__avatar--mobile" aria-hidden="true">
                {initials}
              </span>
              <div className="navbar__mobile-user-info">
                <strong>{displayName}</strong>
                <small>{roleLabel}</small>
              </div>
            </div>
          )}

          <nav className="navbar__mobile-nav" aria-label="Mobile links">
            {navLinks.map((link) => {
              const active = isRouteActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-current={active ? "page" : undefined}
                  className={`navbar__mobile-link ${active ? "active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="navbar__mobile-logout"
            onClick={() => {
              setMenuOpen(false);
              onLogout();
            }}
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M13 7l3 3m0 0l-3 3m3-3H7m6-7H5a2 2 0 00-2 2v12a2 2 0 002 2h8"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
