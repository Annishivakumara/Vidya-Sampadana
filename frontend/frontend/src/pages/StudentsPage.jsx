import React from "react";
import { Link } from "react-router-dom";
import StudentList from "../components/student/StudentList";
import "./StudentsPage.css";

const StudentsPage = () => {
  return (
    <div className="students-page">
      <header className="students-page__hero">
        <div className="container students-page__hero-inner">
          <div className="students-page__hero-copy">
            <nav className="students-page__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Student Directory</span>
            </nav>
            <div className="badge students-page__badge">
              <span className="badge-dot" />
              Academic Registry · Student Service
            </div>
            <h1 className="students-page__title">Student Directory &amp; Records</h1>
            <p className="students-page__sub">
              Maintain verified enrollment records, track academic progression by department and semester, and manage individual student profiles.
            </p>
          </div>

          <div className="students-page__hero-panels" aria-label="Registry capabilities">
            <div className="students-page__mini-panel">
              <span className="students-page__mini-label">Registry Scope</span>
              <strong className="students-page__mini-value">Semesters 1–8</strong>
              <small className="students-page__mini-meta">Undergraduate &amp; Scholars</small>
            </div>
            <div className="students-page__mini-panel">
              <span className="students-page__mini-label">Directory Actions</span>
              <strong className="students-page__mini-value">Enroll &amp; Audit</strong>
              <small className="students-page__mini-meta">Real-time CRUD sync</small>
            </div>
            <div className="students-page__mini-panel students-page__mini-panel--accent">
              <span className="students-page__mini-label">Data Standard</span>
              <strong className="students-page__mini-value">Verified Records</strong>
              <small className="students-page__mini-meta">Departmental classification</small>
            </div>
          </div>
        </div>
      </header>

      <div className="container students-page__content">
        <StudentList />
      </div>
    </div>
  );
};

export default StudentsPage;
