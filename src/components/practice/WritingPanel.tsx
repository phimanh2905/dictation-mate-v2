import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PenTool, Save, CheckCircle2, Info } from 'lucide-react';

export default function WritingPanel() {
  const [content, setContent] = useState('');
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const count = content.trim().split(/\s+/).filter(w => w.length > 0).length;
    setWordCount(count);
  }, [content]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col h-full overflow-hidden p-6"
    >
      <div className="max-w-2xl mx-auto w-full h-full flex flex-col bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Prompt Header */}
        <div className="p-6 bg-amber-50/50 border-b border-amber-100/50 shrink-0">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-amber-100">
              <PenTool size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-900">Writing Prompt</h3>
              <p className="text-xs text-amber-700 mt-1 leading-relaxed font-medium">
                Watch the video and write a summary of the key points discussed. 
                Focus on the negotiation strategies mentioned.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded uppercase">80-120 words</span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded uppercase">Summary</span>
              </div>
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 p-6 flex flex-col min-h-0">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your summary here..."
            className="flex-1 w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-3xl resize-none focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 transition-all text-slate-700 leading-relaxed text-base font-medium no-scrollbar shadow-sm"
          />
        </div>

        {/* Footer Controls */}
        <div className="p-6 bg-white border-t border-slate-100 shrink-0">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className={`text-lg font-bold ${
                  wordCount >= 80 && wordCount <= 120 ? 'text-emerald-600' : 'text-slate-900'
                }`}>
                  {wordCount} <span className="text-xs text-slate-400 font-medium">/ 80-120 words</span>
                </span>
                <div className="w-32 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      wordCount < 80 ? 'bg-amber-500' : wordCount <= 120 ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.min((wordCount / 120) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <Info size={14} />
              Auto-save active
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2 active:scale-95">
              <Save size={20} />
              Save Draft
            </button>
            <button 
              disabled={wordCount < 40}
              className="flex-[2] py-4 bg-amber-600 text-white rounded-2xl font-bold hover:bg-amber-700 disabled:opacity-50 transition-all shadow-lg shadow-amber-500/25 active:scale-95 flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={20} />
              Submit for Review
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
