import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Lightbulb, CheckCircle2, XCircle, RefreshCw, ChevronRight } from 'lucide-react';

export default function DictationPanel() {
  const [input, setInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const checkAnswer = () => {
    if (input.toLowerCase().trim() === 'market rates') {
      setStatus('correct');
    } else {
      setStatus('wrong');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col p-6 overflow-y-auto no-scrollbar"
    >
      <div className="max-w-2xl mx-auto w-full bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header Section */}
        <div className="px-8 py-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Chunk 4 of 12</h3>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full w-1/3" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">33% Complete</span>
              </div>
            </div>
            
            <button className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-100 transition-all active:scale-95 shadow-sm">
              <Volume2 size={24} />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-8 space-y-12">
          <div className="text-center space-y-8">
            <p className="text-2xl text-slate-700 leading-relaxed font-medium">
              "...the key is to research{' '}
              <span className={`inline-block min-w-[140px] border-b-4 px-3 py-1 rounded-lg transition-all ${
                status === 'correct' ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 
                status === 'wrong' ? 'border-rose-500 text-rose-600 bg-rose-50' : 
                'border-blue-400 bg-slate-50 text-transparent'
              }`}>
                {showHint || status !== 'idle' ? 'market rates' : '_____ _____'}
              </span>
              {' '}beforehand..."
            </p>

            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (status !== 'idle') setStatus('idle');
              }}
              placeholder="Type what you hear..."
              className={`w-full px-8 py-5 bg-slate-50 border-2 rounded-2xl text-xl font-bold text-center transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/10 ${
                status === 'correct' ? 'border-emerald-500 bg-white' : 
                status === 'wrong' ? 'border-rose-500 bg-white' : 
                'border-slate-200 focus:border-blue-500 focus:bg-white'
              }`}
              onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex gap-4">
          <button
            onClick={() => setShowHint(true)}
            className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm"
          >
            <Lightbulb size={20} className="text-amber-500" />
            Hint
          </button>
          <button
            onClick={checkAnswer}
            disabled={!input.trim()}
            className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/25 active:scale-95 flex items-center justify-center gap-2"
          >
            Check Answer
          </button>
        </div>
      </div>

      {/* Feedback Card */}
      <AnimatePresence>
        {status !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="max-w-2xl mx-auto w-full mt-6"
          >
            <div className={`p-6 rounded-3xl border-2 flex items-center justify-between gap-4 shadow-lg ${
              status === 'correct' ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'
            }`}>
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${
                  status === 'correct' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                }`}>
                  {status === 'correct' ? <CheckCircle2 size={28} /> : <XCircle size={28} />}
                </div>
                <div>
                  <p className={`font-bold text-xl ${status === 'correct' ? 'text-emerald-900' : 'text-rose-900'}`}>
                    {status === 'correct' ? 'Excellent!' : 'Not quite right'}
                  </p>
                  <p className={`text-sm font-medium ${status === 'correct' ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {status === 'correct' ? 'You nailed "market rates"!' : 'The correct answer was "market rates"'}
                  </p>
                </div>
              </div>
              
              <button className={`px-8 py-4 rounded-2xl font-bold text-white flex items-center gap-2 transition-all active:scale-95 shadow-md ${
                status === 'correct' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-900 hover:bg-black'
              }`}>
                {status === 'correct' ? 'Next Chunk' : 'Try Again'}
                {status === 'correct' ? <ChevronRight size={20} /> : <RefreshCw size={18} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
