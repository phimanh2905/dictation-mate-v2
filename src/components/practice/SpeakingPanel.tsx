import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bot, User, Mic, Send, Sparkles } from 'lucide-react';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  correction?: string;
}

export default function SpeakingPanel() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: "Hi! I'm your AI conversation partner. Let's discuss the topic from the video. What do you think about salary negotiation strategies?" }
  ]);
  const [input, setInput] = useState('');

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col h-full bg-slate-50/30 p-6"
    >
      <div className="max-w-2xl mx-auto w-full h-full flex flex-col bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                msg.sender === 'user' ? 'bg-slate-200' : 'bg-emerald-600 text-white'
              }`}>
                {msg.sender === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              
              <div className={`max-w-[80%] space-y-2 ${msg.sender === 'user' ? 'items-end' : ''}`}>
                <div className={`p-4 rounded-3xl shadow-sm text-sm font-medium leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-emerald-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                }`}>
                  {msg.text}
                </div>
                
                {msg.correction && (
                  <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-100 rounded-2xl">
                    <Sparkles size={14} className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-amber-800 font-bold leading-tight">
                      Suggestion: <span className="font-normal">{msg.correction}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-slate-100 shrink-0">
          <div className="flex gap-3">
            <button className="w-12 h-12 bg-slate-100 text-slate-500 rounded-2xl flex items-center justify-center hover:bg-slate-200 transition-all active:scale-95">
              <Mic size={24} />
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your response..."
                className="w-full h-12 pl-4 pr-12 bg-slate-100 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all"
              />
              <button 
                className={`absolute right-1 top-1 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  input.trim() ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' : 'text-slate-300'
                }`}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
