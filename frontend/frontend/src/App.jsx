import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

import Navbar from "./components/common/navbar/Navbar";
import Footer from "./components/common/Footer";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import HomePage from "./pages/HomePage";
import StudentsPage from "./pages/StudentsPage";
import About from './components/home/About';
import StudentDetailPage from "./pages/StudentDetailPage";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [authView, setAuthView] = useState("login"); 

  const handleLogin = (authenticatedUser) => {
    localStorage.setItem("currentUser", JSON.stringify(authenticatedUser));
    setUser(authenticatedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  // If no user profile is stored, show the auth panels
  if (!user) {
    return authView === "login" ? (
      <Login onLogin={handleLogin} onNavigateToRegister={() => setAuthView("register")} />
    ) : (
      <Register onNavigateToLogin={() => setAuthView("login")} />
    );
  }

  // Debug: Log user object to check structure
  console.log("Current User Object:", user);

  return (
    <div className="app-wrapper">
      {/* Pass user down to Navbar to display name or conditional tabs */}
      <Navbar user={user} onLogout={handleLogout} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Allow any logged-in user to access students page */}
          <Route path="/students" element={<StudentsPage />} />
          
          <Route path="/students/:id" element={<StudentDetailPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;