import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mic, Square, Play, RotateCcw, CheckCircle2, Clock, ChevronLeft, ChevronRight, Repeat, Volume2 } from 'lucide-react';
import { TranscriptLine } from '../../types';

const MOCK_TRANSCRIPT: TranscriptLine[] = [
  { timestamp: 0, text: "Welcome to this lesson on salary negotiation.", chunkIndex: 0 },
  { timestamp: 5, text: "Today we'll cover the most important strategies.", chunkIndex: 1 },
  { timestamp: 10, text: "First, you need to understand your market value.", chunkIndex: 2 },
  { timestamp: 15, text: "The key is to research market rates beforehand.", chunkIndex: 3 },
  { timestamp: 20, text: "This gives you a strong foundation for your request.", chunkIndex: 4 },
];

export default function ShadowingPanel() {
  const [recorderState, setRecorderState] = useState<'ready' | 'recording' | 'playback'>('ready');
  const [activeChunk, setActiveChunk] = useState(3);

  const handleRecord = () => {
    setRecorderState('recording');
  };

  const handleStop = () => {
    setRecorderState('playback');
  };

  const handleRetry = () => {
    setRecorderState('ready');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col h-full overflow-hidden p-6"
    >
      <div className="max-w-2xl mx-auto w-full h-full flex flex-col bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Chunk Navigator */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
                <ChevronLeft size={20} />
              </button>
              <span className="text-sm font-bold text-slate-700">Chunk {activeChunk + 1} of 12</span>
              <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-violet-500 rounded-full w-1/4" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress 25%</span>
          </div>
        </div>

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
              const isFaded = Math.abs(line.chunkIndex - activeChunk) > 0;
              return (
                <div 
                  key={idx}
                  className={`p-4 rounded-2xl transition-all cursor-pointer border-2 ${
                    isActive 
                      ? 'bg-white border-violet-500 shadow-md scale-[1.02]' 
                      : 'bg-white/50 border-transparent hover:bg-white hover:border-slate-200'
                  } ${isFaded ? 'opacity-40' : 'opacity-100'}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex flex-col items-center mt-1 ${isActive ? 'text-violet-600' : 'text-slate-400'}`}>
                      <span className="text-[10px] font-mono">0:{line.timestamp.toString().padStart(2, '0')}</span>
                      {isActive && <div className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-1" />}
                    </div>
                    <div className="flex-1">
                      <p className={`text-base leading-relaxed ${isActive ? 'text-slate-900 font-bold' : 'text-slate-500 font-medium'}`}>
                        {line.text}
                      </p>
                      {isActive && (
                        <button className="mt-3 flex items-center gap-2 text-xs font-bold text-violet-600 bg-violet-50 px-3 py-1.5 rounded-xl hover:bg-violet-100 transition-colors">
                          <Play size={14} fill="currentColor" />
                          Listen to chunk
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Audio Controls */}
        <div className="px-6 py-4 bg-white border-t border-slate-100 flex items-center justify-center gap-6 shrink-0">
          <button className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-violet-600 transition-colors">
            <Volume2 size={18} />
            Play Original
          </button>
          <div className="h-4 w-px bg-slate-200" />
          <button className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-violet-600 transition-colors">
            <Repeat size={18} />
            Loop
          </button>
          <div className="h-4 w-px bg-slate-200" />
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            Speed
            <select className="bg-slate-100 rounded-lg px-2 py-1 outline-none text-violet-600">
              <option>0.75x</option>
              <option selected>1x</option>
              <option>1.25x</option>
              <option>1.5x</option>
            </select>
          </div>
        </div>

        {/* Recorder Controls */}
        <div className="p-8 bg-white border-t border-slate-100 shrink-0">
          <div className="flex flex-col items-center gap-6">
            {recorderState === 'recording' && (
              <div className="flex items-center gap-3 text-rose-500 font-bold animate-pulse">
                <div className="w-2.5 h-2.5 bg-rose-500 rounded-full" />
                Recording... 0:03
              </div>
            )}

            {recorderState === 'playback' && (
              <div className="w-full space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>Original vs Yours</span>
                </div>
                <div className="w-full h-16 bg-slate-50 rounded-2xl relative overflow-hidden flex items-center px-4 gap-1">
                  {/* Mock Waveform Comparison */}
                  <div className="absolute inset-0 flex items-center px-4 gap-1 opacity-20">
                    {[...Array(40)].map((_, i) => (
                      <div key={i} className="flex-1 bg-slate-400 rounded-full h-0.5" />
                    ))}
                  </div>
                  <div className="relative flex-1 flex items-center gap-1 h-full">
                    {[...Array(40)].map((_, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-violet-400 rounded-full" 
                        style={{ height: `${Math.random() * 80 + 20}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-8">
              {/* Retry Button */}
              <button 
                onClick={handleRetry}
                className={`flex flex-col items-center gap-1 transition-all ${recorderState === 'playback' ? 'text-slate-600 hover:text-slate-900' : 'text-slate-200 cursor-not-allowed'}`}
                disabled={recorderState !== 'playback'}
              >
                <div className="p-4 bg-slate-100 rounded-2xl">
                  <RotateCcw size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">Retry</span>
              </button>

              {/* Main Action Button */}
              <button
                onClick={recorderState === 'ready' ? handleRecord : recorderState === 'recording' ? handleStop : handleRecord}
                className="flex flex-col items-center gap-1 group"
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl active:scale-95 ${
                  recorderState === 'recording' 
                    ? 'bg-rose-500 text-white shadow-rose-200' 
                    : recorderState === 'ready'
                    ? 'bg-rose-600 text-white shadow-rose-200 hover:bg-rose-700'
                    : 'bg-violet-600 text-white shadow-violet-200 hover:bg-violet-700'
                }`}>
                  {recorderState === 'recording' ? <Square size={28} fill="currentColor" /> : <Mic size={32} />}
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-violet-600 transition-colors">
                  {recorderState === 'ready' ? 'Record' : recorderState === 'recording' ? 'Stop' : 'Replay'}
                </span>
                {recorderState === 'ready' && <span className="text-[10px] text-slate-400 mt-1">Nhấn để nói</span>}
              </button>

              {/* Next Button */}
              <button 
                className={`flex flex-col items-center gap-1 transition-all ${recorderState === 'playback' ? 'text-emerald-600 hover:text-emerald-700' : 'text-slate-200 cursor-not-allowed'}`}
                disabled={recorderState !== 'playback'}
              >
                <div className={`p-4 rounded-2xl ${recorderState === 'playback' ? 'bg-emerald-50' : 'bg-slate-100'}`}>
                  <CheckCircle2 size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
