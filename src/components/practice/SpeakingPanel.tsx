import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Play, RotateCcw, Sparkles, ChevronLeft, ChevronRight, Volume2, CheckCircle2, Square, Info } from 'lucide-react';

type SpeakingState = 'ready' | 'recording' | 'analyzing' | 'result';

export default function SpeakingPanel() {
  const [state, setState] = useState<SpeakingState>('ready');
  const [activeChunk, setActiveChunk] = useState(3);

  const words = [
    { text: 'the', score: 95, status: 'exact' },
    { text: 'key', score: 92, status: 'exact' },
    { text: 'is', score: 98, status: 'exact' },
    { text: 'to', score: 90, status: 'exact' },
    { text: 'research', score: 88, status: 'close' },
    { text: 'market', score: 94, status: 'exact' },
    { text: 'rates', score: 65, status: 'wrong' },
    { text: 'beforehand', score: 82, status: 'close' },
  ];

  const handleRecord = () => {
    setState('recording');
  };

  const handleStop = () => {
    setState('analyzing');
    // Simulate analysis delay
    setTimeout(() => {
      setState('result');
    }, 1500);
  };

  const handleRetry = () => {
    setState('ready');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col h-full overflow-y-auto no-scrollbar p-6 space-y-6"
    >
      <div className="max-w-2xl mx-auto w-full flex flex-col bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* 1. Chunk Navigation Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
                <ChevronLeft size={20} />
              </button>
              <span className="text-sm font-bold text-emerald-600">Chunk {activeChunk + 1} of 12</span>
              <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-1/3" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">33% Complete</span>
          </div>
        </div>

        {/* 2. Instruction Bar */}
        <div className="px-6 py-3 bg-emerald-50/50 border-b border-emerald-100 flex items-center gap-2">
          <Volume2 size={16} className="text-emerald-600" />
          <span className="text-xs font-bold text-emerald-800">Nghe và nói lại câu sau:</span>
        </div>

        {/* 3. Target Text Card */}
        <div className="p-8 text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target Sentence</h3>
            <p className="text-2xl font-bold text-slate-800 leading-relaxed">
              "the key is to research market rates beforehand"
            </p>
          </div>
          
          <div className="flex justify-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl font-bold hover:bg-emerald-100 transition-all">
              <Play size={18} fill="currentColor" />
              Nghe audio chunk
            </button>
            <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-all text-xs">
              IPA
            </button>
          </div>
        </div>

        {/* 4. Recorder Section */}
        <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex flex-col items-center gap-6">
          <AnimatePresence mode="wait">
            {state === 'ready' && (
              <motion.div 
                key="ready"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-4"
              >
                <button
                  onClick={handleRecord}
                  className="w-20 h-20 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xl shadow-emerald-200 hover:bg-emerald-700 hover:scale-105 transition-all active:scale-95 group"
                >
                  <Mic size={32} />
                </button>
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-700">Nhấn để bắt đầu nói</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Click để bắt đầu ghi âm</p>
                </div>
              </motion.div>
            )}

            {state === 'recording' && (
              <motion.div 
                key="recording"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-6 w-full"
              >
                <div className="flex items-center gap-3 text-emerald-600 font-bold animate-pulse">
                  <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full" />
                  Recording... 0:03
                </div>
                
                <div className="w-full h-12 bg-emerald-50 rounded-2xl flex items-center justify-center gap-1 px-4">
                  {[...Array(24)].map((_, i) => (
                    <motion.div 
                      key={i} 
                      animate={{ height: [10, Math.random() * 30 + 10, 10] }}
                      transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                      className="w-1 bg-emerald-400 rounded-full" 
                    />
                  ))}
                </div>

                <button
                  onClick={handleStop}
                  className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-xl shadow-rose-200 hover:bg-rose-600 transition-all active:scale-95"
                >
                  <Square size={24} fill="currentColor" />
                </button>
              </motion.div>
            )}

            {state === 'analyzing' && (
              <motion.div 
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 py-4"
              >
                <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
                <p className="text-sm font-bold text-slate-600">Đang phân tích phát âm...</p>
              </motion.div>
            )}

            {state === 'result' && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full space-y-8"
              >
                {/* Score Display */}
                <div className="flex flex-col items-center gap-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Overall Score</div>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-black text-emerald-600">85%</span>
                    <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
                  </div>
                </div>

                {/* Comparison Result */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Info size={12} />
                    YOUR SPEECH vs TRANSCRIPT
                  </div>
                  <div className="flex flex-wrap justify-center gap-x-3 gap-y-4">
                    {words.map((word, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1">
                        <span className={`text-xl font-bold transition-colors ${
                          word.status === 'exact' ? 'text-emerald-500' : 
                          word.status === 'close' ? 'text-amber-500' : 'text-rose-500'
                        }`}>
                          {word.text}
                        </span>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          word.status === 'exact' ? 'bg-emerald-500' : 
                          word.status === 'close' ? 'bg-amber-500' : 'bg-rose-500'
                        }`} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Feedback Box */}
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex gap-4">
                  <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                    <Sparkles size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-amber-900 flex items-center gap-2">
                      Pronunciation Tip
                    </h4>
                    <p className="text-sm text-amber-800 leading-relaxed">
                      ⚠️ <span className="font-bold">"rates"</span> nghe giống <span className="font-bold">"rats"</span>. Luyện âm <span className="font-bold">/eɪ/</span> trong "rates".
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button 
                    onClick={handleRetry}
                    className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={18} />
                    Thử lại
                  </button>
                  <button className="flex-[2] py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-2">
                    Next Chunk
                    <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
