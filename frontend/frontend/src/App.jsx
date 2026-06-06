import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

import Navbar from "./components/common/navbar/Navbar";
import Footer from "./components/common/Footer";
import Login from "./components/common/Login";
import HomePage from "./pages/HomePage";
import StudentsPage from "./pages/StudentsPage";
import About from './components/home/About';
import StudentDetailPage from "./pages/StudentDetailPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isPrototypeLoggedIn") === "true";
  });

  const handleLogin = () => {
    localStorage.setItem("isPrototypeLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isPrototypeLoggedIn");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-wrapper">
      <Navbar onLogout={handleLogout} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/students/:id" element={<StudentDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
