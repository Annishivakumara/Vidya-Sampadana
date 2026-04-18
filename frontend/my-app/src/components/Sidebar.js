import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Target, Sparkles, GraduationCap, Bell, CreditCard, UserCircle } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'My Study Hub', path: '/dashboard', icon: BookOpen },
    { name: 'Exam Updates', path: '/updates', icon: Bell },
    { name: 'Study Buddy (AI)', path: '/chat', icon: Sparkles },
    { name: 'My Profile', path: '/profile', icon: UserCircle },
    { name: 'Notifications', path: '/notifications', icon: Target },
    { name: 'Subscriptions', path: '/payment', icon: CreditCard },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)]">
      <div className="py-6 px-4">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
          Learning Portal
        </div>
        <nav className="space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand text-white shadow-md'
                    : 'text-gray-600 hover:bg-brand-light hover:text-brand-dark'
                }`
              }
            >
              <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 ${item.path === '/chat' && NavLink.isActive ? 'animate-pulse' : ''}`} />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      
      {/* Quick Access Block */}
      <div className="absolute bottom-6 w-64 px-4">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100">
          <h4 className="text-sm font-bold text-indigo-900 mb-1">Upcoming Exam</h4>
          <p className="text-xs text-indigo-700 mb-3">KCET 2026 - 45 Days left!</p>
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors shadow-sm">
            Start Mock Test
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
