import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mic, Square, Play, RotateCcw, CheckCircle2, Clock } from 'lucide-react';
import { TranscriptLine } from '../../types';

const MOCK_TRANSCRIPT: TranscriptLine[] = [
  { timestamp: 0, text: "Welcome to this lesson on salary negotiation.", chunkIndex: 0 },
  { timestamp: 5, text: "Today we'll cover the most important strategies.", chunkIndex: 1 },
  { timestamp: 10, text: "First, you need to understand your market value.", chunkIndex: 2 },
  { timestamp: 15, text: "The key is to research market rates beforehand.", chunkIndex: 3 },
  { timestamp: 20, text: "This gives you a strong foundation for your request.", chunkIndex: 4 },
];

export default function ShadowingPanel() {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const activeChunk = 3;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col h-full overflow-hidden p-6"
    >
      <div className="max-w-2xl mx-auto w-full h-full flex flex-col bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Transcript Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 space-y-4 no-scrollbar">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Transcript</h3>
            <div className="flex items-center gap-1 text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-1 rounded-md">
              <Clock size={12} />
              Auto-scroll ON
            </div>
          </div>

          <div className="space-y-3">
            {MOCK_TRANSCRIPT.map((line, idx) => {
              const isActive = line.chunkIndex === activeChunk;
              return (
                <div 
                  key={idx}
                  className={`p-4 rounded-2xl transition-all cursor-pointer border-2 ${
                    isActive 
                      ? 'bg-white border-violet-500 shadow-md scale-[1.02]' 
                      : 'bg-white/50 border-transparent hover:bg-white hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`text-[10px] font-mono mt-1 ${isActive ? 'text-violet-600' : 'text-slate-400'}`}>
                      0:{line.timestamp.toString().padStart(2, '0')}
                    </span>
                    <p className={`text-base leading-relaxed ${isActive ? 'text-slate-900 font-bold' : 'text-slate-500 font-medium'}`}>
                      {line.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recorder Controls */}
        <div className="p-8 bg-white border-t border-slate-100 shrink-0">
          <div className="flex flex-col items-center gap-6">
            {isRecording && (
              <div className="flex items-center gap-3 text-rose-500 font-bold animate-pulse">
                <div className="w-2.5 h-2.5 bg-rose-500 rounded-full" />
                Recording... 0:04
              </div>
            )}

            {!isRecording && hasRecorded && (
              <div className="w-full h-12 bg-slate-50 rounded-2xl flex items-center justify-center gap-1 px-4">
                {[...Array(40)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-1 bg-violet-400 rounded-full" 
                    style={{ height: `${Math.random() * 80 + 20}%` }}
                  />
                ))}
              </div>
            )}

            <div className="flex items-center gap-8">
              <button 
                className={`flex flex-col items-center gap-1 transition-all ${hasRecorded ? 'text-slate-600 hover:text-slate-900' : 'text-slate-200 cursor-not-allowed'}`}
                disabled={!hasRecorded}
              >
                <div className="p-4 bg-slate-100 rounded-2xl">
                  <RotateCcw size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">Replay</span>
              </button>

              <button
                onClick={() => {
                  setIsRecording(!isRecording);
                  if (isRecording) setHasRecorded(true);
                }}
                className="flex flex-col items-center gap-1 group"
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl active:scale-95 ${
                  isRecording 
                    ? 'bg-rose-500 text-white shadow-rose-200' 
                    : 'bg-violet-600 text-white shadow-violet-200 hover:bg-violet-700'
                }`}>
                  {isRecording ? <Square size={28} fill="currentColor" /> : <Mic size={32} />}
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-violet-600 transition-colors">
                  {isRecording ? 'Stop' : 'Record'}
                </span>
              </button>

              <button 
                className={`flex flex-col items-center gap-1 transition-all ${hasRecorded ? 'text-emerald-600 hover:text-emerald-700' : 'text-slate-200 cursor-not-allowed'}`}
                disabled={!hasRecorded}
              >
                <div className={`p-4 rounded-2xl ${hasRecorded ? 'bg-emerald-50' : 'bg-slate-100'}`}>
                  <CheckCircle2 size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">Analyze</span>
              </button>
            </div>

            {hasRecorded && !isRecording && (
              <button className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 active:scale-95">
                <CheckCircle2 size={20} />
                Analyze Shadowing
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
