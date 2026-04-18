import React, { useState } from 'react';
import { Bell, Filter, Calendar as CalendarIcon, Download, ExternalLink, ChevronRight } from 'lucide-react';

const Updates = () => {
  const [filter, setFilter] = useState('All');

  const updatesList = [
    {
      id: 1,
      category: 'NEET',
      title: 'Correction Window Extended for NEET UG 2026',
      date: 'April 16, 2026',
      tag: 'Urgent',
      desc: 'The National Testing Agency has extended the application correction window by 48 hours. Please ensure your uploaded documents are correctly sized before the deadline.',
      hasLink: true,
      color: 'emerald'
    },
    {
      id: 2,
      category: 'KCET',
      title: 'Admit Cards Released for Phase 1',
      date: 'April 14, 2026',
      tag: 'Important',
      desc: 'Students can now download their admit cards from the official KEA portal. You will need your application number and Date of Birth.',
      hasDownload: true,
      color: 'blue'
    },
    {
      id: 3,
      category: 'NEET',
      title: 'Minor changes in Biology Syllabus weightage',
      date: 'April 10, 2026',
      tag: 'Syllabus',
      desc: 'Based on the latest NTA notification, the weightage for standard 11th Genetics has been revised. Check the official module breakdown in the study materials.',
      color: 'emerald'
    },
    {
      id: 4,
      category: 'KCET',
      title: 'Mock Test 4 Result Analysis Published',
      date: 'April 8, 2026',
      tag: 'Prep',
      desc: 'The detailed breakdown and video solutions for last Sunday\'s KCET Mock test are now available in your learning dashboard.',
      color: 'blue'
    }
  ];

  const filteredUpdates = filter === 'All' ? updatesList : updatesList.filter(u => u.category === filter);

  return (
    <div className="max-w-5xl mx-auto pb-12">
      {/* Header Area */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand/5 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-display font-bold text-slate-900 flex items-center">
            <Bell className="w-8 h-8 mr-3 text-brand" /> Exam Updates Feed
          </h1>
          <p className="text-gray-500 mt-2 text-lg max-w-xl">
            Stay on top of all crucial announcements, admit cards, and syllabus changes for your upcoming exams.
          </p>
        </div>
        
        <div className="flex gap-2 relative z-10 bg-gray-50 p-1.5 rounded-xl border border-gray-200">
          {['All', 'KCET', 'NEET'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                filter === f 
                ? 'bg-white text-slate-800 shadow-md border border-gray-100' 
                : 'text-gray-500 hover:text-gray-700 bg-transparent border border-transparent'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Timeline */}
      <div className="relative pl-4 md:pl-8">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-8 top-4 bottom-4 w-px bg-gray-200"></div>

        <div className="space-y-8 relative">
          {filteredUpdates.map((update) => (
            <div key={update.id} className="relative pl-8 md:pl-12 group">
              {/* Timeline dot */}
              <div className={`absolute left-[-5px] md:left-[-5px] top-6 w-3 h-3 rounded-full ring-4 ring-white shadow-sm z-10 ${update.color === 'blue' ? 'bg-blue-500' : 'bg-emerald-500'} group-hover:scale-125 transition-transform`}></div>
              
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow group-hover:border-gray-200">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                       <span className={`px-2.5 py-1 rounded-md text-xs font-bold text-white shadow-sm bg-${update.color}-500`}>
                        {update.category}
                      </span>
                      <span className={`text-xs font-bold px-2 py-1 rounded bg-gray-100 text-gray-700 uppercase tracking-widest`}>
                        {update.tag}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 group-hover:text-brand transition-colors">
                      {update.title}
                    </h2>
                  </div>
                  
                  <div className="flex items-center text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 shrink-0">
                    <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                    {update.date}
                  </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed max-w-3xl mb-5">
                  {update.desc}
                </p>

                {/* Actions if applicable */}
                {(update.hasLink || update.hasDownload) && (
                  <div className="flex gap-3 pt-4 border-t border-gray-50">
                    {update.hasLink && (
                      <button className="flex items-center text-sm font-semibold text-brand hover:text-brand-dark transition-colors">
                         Official Notice <ExternalLink className="w-4 h-4 ml-1.5" />
                      </button>
                    )}
                    {update.hasDownload && (
                      <button className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                         Download File <Download className="w-4 h-4 ml-1.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Updates;
