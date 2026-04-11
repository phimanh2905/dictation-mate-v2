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
            <div className="text-2xl text-slate-700 leading-relaxed font-medium">
              "...the key is to research{' '}
              <span className={`inline-block min-w-[140px] border-b-4 px-3 py-1 rounded-lg transition-all ${
                status === 'correct' ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 
                status === 'wrong' ? 'border-rose-500 text-rose-600 bg-rose-50' : 
                'border-blue-400 bg-slate-50 text-slate-400'
              }`}>
                {status === 'correct' ? (
                  <span className="flex items-center justify-center gap-2">
                    market rates <CheckCircle2 size={20} />
                  </span>
                ) : status === 'wrong' ? (
                  <span className="flex items-center justify-center gap-2">
                    {input || '_____'} <XCircle size={20} />
                  </span>
                ) : (
                  showHint ? 'market rates' : '[________]'
                )}
              </span>
              {' '}beforehand..."
            </div>

            {status === 'wrong' && (
              <div className="text-emerald-600 font-bold text-sm bg-emerald-50 py-2 px-4 rounded-xl inline-block">
                Correct answer: market rates
              </div>
            )}

            <input
              type="text"
              value={input}
              disabled={status !== 'idle'}
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
            disabled={status !== 'idle'}
            className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm disabled:opacity-50"
          >
            <Lightbulb size={20} className="text-amber-500" />
            Hint
          </button>
          <button
            onClick={status === 'idle' ? checkAnswer : () => { setStatus('idle'); setInput(''); setShowHint(false); }}
            disabled={status === 'idle' && !input.trim()}
            className={`flex-[2] py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 ${
              status === 'idle' 
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/25' 
                : 'bg-slate-900 text-white hover:bg-black'
            }`}
          >
            {status === 'idle' ? 'Check Answer' : 'Try Again'}
            {status === 'idle' ? <CheckCircle2 size={20} /> : <RefreshCw size={18} />}
          </button>
        </div>
      </div>

      {/* Next Step Button (Only if correct) */}
      <AnimatePresence>
        {status === 'correct' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto w-full mt-6"
          >
            <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2">
              Next Chunk
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
