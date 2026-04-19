import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, LogOut, User } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <img src={logo} alt="Vidya Sampadana Logo" className="h-10 w-10 object-contain rounded-full shadow-sm" />
              <span className="font-display font-bold text-xl text-slate-800">
                Vidya <span className="text-brand">Sampadana</span>
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/about" className="text-gray-600 hover:text-brand px-3 py-2 rounded-md font-medium transition-colors">
              About Us
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-gray-600 hover:text-brand px-3 py-2 rounded-md font-medium transition-colors">
                  Dashboard
                </Link>
                <div className="h-8 w-px bg-gray-200"></div>
                <Link to="/profile" className="flex items-center space-x-2 text-sm text-slate-700 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{user.name || 'Student'}</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-gray-600 hover:text-brand px-4 py-2 font-medium transition-colors">
                  Login
                </Link>
                <Link to="/login" className="bg-brand hover:bg-brand-dark text-white px-5 py-2 rounded-lg font-medium shadow-sm transition-all transform hover:-translate-y-0.5">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
