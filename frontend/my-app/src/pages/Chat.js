import React, { useState } from 'react';
import { Send, User, Sparkles, BookOpen, Lightbulb, TrendingUp } from 'lucide-react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your Vidya Sampadana Study Buddy. I can explain complex topics, test your knowledge, or help you plan your study schedule. What would you like to do today?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');

  const quickPrompts = [
    { icon: Lightbulb, text: "Explain a Physics concept", color: "text-amber-500", bg: "bg-amber-50 border-amber-200" },
    { icon: TrendingUp, text: "Create a 7-day revision plan", color: "text-emerald-500", bg: "bg-emerald-50 border-emerald-200" },
    { icon: BookOpen, text: "Test my Biology knowledge", color: "text-blue-500", bg: "bg-blue-50 border-blue-200" }
  ];

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    const newMsg = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: "That's a great question! I'm currently running in local UI demo mode, but once fully connected to the AI service, I'll provide detailed, step-by-step guidance for exactly this.",
        sender: 'ai'
      }]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl -z-10"></div>
      
      {/* Header */}
      <div className="p-5 border-b border-gray-100 bg-white/80 backdrop-blur-sm flex items-center justify-between z-10">
        <div>
          <h2 className="font-bold text-slate-800 flex items-center text-xl">
            <Sparkles className="h-6 w-6 text-brand mr-2" /> Study Buddy AI
          </h2>
          <p className="text-xs text-gray-500 mt-1 pl-8">Powered by Vidya Sampadana Engine</p>
        </div>
        <span className="flex items-center text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-full font-bold border border-green-100 shadow-sm">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse"></span> Online
        </span>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10 flex flex-col">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] flex ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${msg.sender === 'user' ? 'bg-indigo-100 ml-3' : 'bg-gradient-to-br from-brand to-brand-dark text-white mr-3'}`}>
                {msg.sender === 'user' ? <User className="h-5 w-5 text-indigo-700" /> : <Sparkles className="h-5 w-5" />}
              </div>
              <div className={`px-5 py-4 rounded-2xl shadow-sm ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-gray-100 text-slate-700 rounded-tl-none'}`}>
                <p className="text-[15px] leading-relaxed">{msg.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Input Area */}
      <div className="p-4 bg-white/90 backdrop-blur-md border-t border-gray-100 z-10">
        {/* Quick Prompts */}
        {messages.length < 3 && (
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {quickPrompts.map((prompt, i) => (
              <button 
                key={i}
                onClick={() => handleSend(prompt.text)}
                className={`flex items-center px-4 py-2 rounded-full text-xs font-semibold border transition-all hover:scale-105 ${prompt.bg} text-slate-700 hover:shadow-sm`}
              >
                <prompt.icon className={`w-3.5 h-3.5 mr-1.5 ${prompt.color}`} />
                {prompt.text}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="relative max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question here..."
            className="w-full bg-gray-50 border border-gray-200 text-slate-800 rounded-xl pl-5 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent shadow-inner transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-2 top-2 bottom-2 bg-brand text-white w-10 flex items-center justify-center rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5 ml-1" />
          </button>
        </form>
        <p className="text-center text-[10px] text-gray-400 mt-2 font-medium">Study Buddy can make mistakes. Consider verifying important facts.</p>
      </div>
    </div>
  );
};

export default Chat;
