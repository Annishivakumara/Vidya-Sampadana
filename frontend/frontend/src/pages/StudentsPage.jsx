import React from "react";
import StudentList from "../components/student/StudentList";
import "./StudentsPage.css";

const StudentsPage = () => {
  return (
    <div className="students-page">
      <div className="students-page__hero">
        <div className="container">
          <div className="badge">
            <span className="badge-dot" />
            Student Management
          </div>
          <h1 className="students-page__title">Manage Students</h1>
          <p className="students-page__sub">
            View, register, and manage all enrolled students in one place.
          </p>
        </div>
      </div>
      <div className="container students-page__content">
        <StudentList />
      </div>
    </div>
  );
};

export default StudentsPage;
