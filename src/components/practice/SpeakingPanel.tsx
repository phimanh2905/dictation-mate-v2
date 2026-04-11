import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mic, Play, RotateCcw, Sparkles } from 'lucide-react';

export default function SpeakingPanel() {
  const [isRecording, setIsRecording] = useState(false);
  const [hasResult, setHasResult] = useState(false);

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

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col h-full overflow-y-auto no-scrollbar p-6 space-y-6"
    >
      <div className="max-w-2xl mx-auto w-full bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Target Text Section */}
        <div className="p-8 text-center space-y-6">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target Sentence</h3>
          <p className="text-2xl font-bold text-slate-800 leading-relaxed">
            "the key is to research market rates beforehand"
          </p>
          
          <div className="flex justify-center">
            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl font-bold hover:bg-emerald-100 transition-all">
              <Play size={18} fill="currentColor" />
              Listen to native
            </button>
          </div>
        </div>

        {/* Comparison View (Only if hasResult) */}
        {hasResult && (
          <div className="px-8 py-6 bg-slate-50 border-y border-slate-100">
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-4">
              {words.map((word, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <span className={`text-xl font-bold ${
                    word.status === 'exact' ? 'text-emerald-500' : 
                    word.status === 'close' ? 'text-amber-500' : 'text-rose-500'
                  }`}>
                    {word.text}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{word.score}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recorder Section */}
        <div className="p-8 flex flex-col items-center gap-6">
          {isRecording && (
            <div className="flex items-center gap-3 text-emerald-500 font-bold animate-pulse">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
              0:03
            </div>
          )}

          <button
            onClick={() => {
              setIsRecording(!isRecording);
              if (isRecording) setHasResult(true);
            }}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl active:scale-95 ${
              isRecording 
                ? 'bg-rose-500 text-white shadow-rose-200' 
                : 'bg-emerald-600 text-white shadow-emerald-200 hover:bg-emerald-700'
            }`}
          >
            {isRecording ? <div className="w-6 h-6 bg-white rounded-sm" /> : <Mic size={32} />}
          </button>

          <p className="text-sm font-medium text-slate-500">
            {isRecording ? 'Tap to stop' : 'Tap to start recording'}
          </p>
        </div>
      </div>

      {/* Result & Feedback (Only if hasResult) */}
      {hasResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto w-full space-y-4"
        >
          {/* Score Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center border-2 border-emerald-100">
                <span className="text-2xl font-bold text-emerald-600">85%</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Overall Score</h4>
                <p className="text-xs text-slate-500">Great job! You're almost there.</p>
              </div>
            </div>
            <button className="p-3 text-slate-400 hover:bg-slate-50 rounded-xl transition-all">
              <RotateCcw size={20} />
            </button>
          </div>

          {/* Feedback Box */}
          <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 flex gap-4">
            <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
              <Sparkles size={20} />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-amber-900">Pronunciation Tip</h4>
              <p className="text-sm text-amber-800 leading-relaxed">
                'rates' sounds like 'rats' - practice the <span className="font-bold">/eɪ/</span> sound by dropping your jaw slightly more.
              </p>
            </div>
          </div>

          <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg active:scale-95">
            Try Next Sentence
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
