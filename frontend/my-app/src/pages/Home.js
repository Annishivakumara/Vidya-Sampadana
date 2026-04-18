import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, BrainCircuit, Goal } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-brand-dark via-brand to-brand-light text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
              Shape Your Future with <span className="text-accent-light text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-accent">Vidya Sampadana</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-light mb-8 opacity-90 leading-relaxed font-light">
              Your ultimate educational companion. From KCET & NEET updates to AI-driven career guidance, we provide everything you need to succeed in one unified platform.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/login" className="bg-white text-brand-dark hover:bg-gray-50 px-8 py-3.5 rounded-full font-semibold shadow-lg transition-transform transform hover:-translate-y-1 text-center flex items-center justify-center">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/about" className="px-8 py-3.5 rounded-full font-semibold border-2 border-white text-white hover:bg-white/10 transition-colors text-center">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Everything You Need to Succeed</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Integrated microservices to power every step of your educational journey.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard 
              icon={<BookOpen className="h-8 w-8 text-white" />}
              title="Real-time Updates"
              desc="Stay ahead with instant notifications for KCET and NEET announcements, syllabus changes, and exam schedules."
              color="bg-blue-500"
            />
            <FeatureCard 
              icon={<BrainCircuit className="h-8 w-8 text-white" />}
              title="AI Assistant"
              desc="Get 24/7 personalized career guidance and doubt resolution from our intelligent chat service."
              color="bg-brand"
            />
            <FeatureCard 
              icon={<Goal className="h-8 w-8 text-white" />}
              title="Smart Analytics"
              desc="Track your performance, analyze your strengths, and focus your preparation where it matters most."
              color="bg-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, color }) => (
  <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow border border-gray-100">
    <div className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center mb-6 shadow-md`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

export default Home;
