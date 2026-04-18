import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Target, CheckCircle, Clock, Calendar, ChevronRight, PlayCircle, FileText, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);

  const learningStats = [
    { label: 'Questions Solved', value: '1,248', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Overall Accuracy', value: '78%', icon: Target, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Mock Tests Taken', value: '12', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Study Streak (Days)', value: '14', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Quick Action Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">My Study Hub</h1>
          <p className="text-gray-500 mt-1 text-lg">Hello {user?.name || 'Student'}, ready to conquer today's goals?</p>
        </div>
        
        <div className="flex gap-3">
          <Link to="/chat" className="flex items-center px-4 py-2.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl font-semibold transition-colors border border-indigo-200 shadow-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Ask Study Buddy
          </Link>
          <button className="flex items-center px-5 py-2.5 bg-brand hover:bg-brand-dark text-white rounded-xl font-semibold transition-colors shadow-md transform hover:-translate-y-0.5">
            <PlayCircle className="w-5 h-5 mr-2" />
            Daily Challenge
          </button>
        </div>
      </div>

      {/* Exam Countdown Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CountdownCard 
          title="KCET 2026 Phase 1" 
          date="April 18, 2026" 
          days="45" 
          color="from-blue-500 to-indigo-600"
          tag="State Level"
        />
        <CountdownCard 
          title="NEET UG 2026" 
          date="May 5, 2026" 
          days="62" 
          color="from-emerald-500 to-teal-600"
          tag="National Level"
        />
      </div>

      {/* Performance Stats */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-brand" /> My Performance
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {learningStats.map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4 hover:shadow-md transition-shadow">
              <div className={`p-3.5 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 leading-none">{stat.value}</h3>
                <p className="text-xs font-medium text-gray-500 mt-1 uppercase tracking-wide">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Continue Learning */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-slate-800">Continue Learning</h2>
            <button className="text-sm font-semibold text-brand hover:text-brand-dark flex items-center">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <LearningModuleCard 
              subject="Physics"
              topic="Electromagnetic Induction"
              progress={75}
              timeLeft="15 mins"
              color="bg-purple-500"
            />
            <LearningModuleCard 
              subject="Biology"
              topic="Human Reproduction"
              progress={30}
              timeLeft="45 mins"
              color="bg-green-500"
            />
          </div>
        </div>

        {/* Actionable Updates */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-brand" /> Urgent Alerts
          </h2>
          <div className="space-y-5">
            <UpdateItem 
              badge="NEET"
              badgeColor="bg-emerald-100 text-emerald-800"
              text="Correction window closes in 24 hours!"
              time="2 hours ago"
              critical={true}
            />
            <UpdateItem 
              badge="KCET"
              badgeColor="bg-blue-100 text-blue-800"
              text="New mock test series uploaded in Practice section."
              time="5 hours ago"
            />
            <UpdateItem 
              badge="System"
              badgeColor="bg-gray-100 text-gray-800"
              text="Scheduled maintenance tonight at 2 AM."
              time="1 day ago"
            />
          </div>
          <Link to="/updates" className="mt-6 block text-center w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-sm font-semibold text-gray-700 rounded-lg transition-colors border border-gray-200">
            View All Updates
          </Link>
        </div>
      </div>
    </div>
  );
};

// Sub-components for cleaner code

const CountdownCard = ({ title, date, days, color, tag }) => (
  <div className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-lg bg-gradient-to-r ${color}`}>
    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold tracking-wider mb-4 border border-white/20 shadow-sm">
      {tag}
    </span>
    <h3 className="text-2xl font-bold mb-1">{title}</h3>
    <p className="text-white/80 text-sm mb-6 flex items-center">
      <Calendar className="w-4 h-4 mr-1.5" /> Scheduled for {date}
    </p>
    <div className="flex items-end space-x-3">
      <span className="text-5xl font-display font-black leading-none drop-shadow-md">{days}</span>
      <span className="text-lg font-medium opacity-90 pb-1">Days Remaining</span>
    </div>
  </div>
);

const LearningModuleCard = ({ subject, topic, progress, timeLeft, color }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm group hover:shadow-md transition-all cursor-pointer hover:border-brand-light">
    <div className="flex justify-between items-start mb-4">
      <div className={`px-2.5 py-1 rounded text-xs font-bold text-white shadow-sm ${color}`}>
        {subject}
      </div>
      <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded flex items-center border border-gray-200">
        <Clock className="w-3 h-3 mr-1" /> {timeLeft}
      </span>
    </div>
    <h3 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-brand transition-colors">{topic}</h3>
    <p className="text-sm text-gray-500 mb-4">Chapter 4 • Module 2</p>
    
    <div className="space-y-1.5 mt-auto">
      <div className="flex justify-between text-xs font-medium">
        <span className="text-brand">{progress}% Complete</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden shadow-inner">
        <div className={`${color} h-2 rounded-full transition-all duration-500`} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  </div>
);

const UpdateItem = ({ badge, badgeColor, text, time, critical }) => (
  <div className="flex gap-3">
    <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${critical ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`}></div>
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${badgeColor}`}>
          {badge}
        </span>
        <span className="text-xs text-gray-400 font-medium">{time}</span>
      </div>
      <p className={`text-sm leading-snug ${critical ? 'font-semibold text-red-900' : 'text-slate-700'}`}>
        {text}
      </p>
    </div>
  </div>
);

export default StudentDashboard;
