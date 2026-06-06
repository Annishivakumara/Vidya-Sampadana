import React from "react";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import About from "../components/home/About";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <Features />
      <About />
    </div>
  );
};

export default HomePage;
