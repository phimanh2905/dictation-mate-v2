import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, Square, Play, RotateCcw, CheckCircle2, Clock, 
  ChevronLeft, ChevronRight, Repeat, Volume2, 
  EyeOff, Monitor, Lightbulb 
} from 'lucide-react';
import { TranscriptLine } from '../../types';

const MOCK_TRANSCRIPT: TranscriptLine[] = [
  { timestamp: 0, text: "Welcome to this lesson on salary negotiation.", chunkIndex: 0 },
  { timestamp: 5, text: "Today we'll cover the most important strategies.", chunkIndex: 1 },
  { timestamp: 10, text: "First, you need to understand your market value.", chunkIndex: 2 },
  { timestamp: 15, text: "The key is to research market rates beforehand.", chunkIndex: 3 },
  { timestamp: 20, text: "This gives you a strong foundation for your request.", chunkIndex: 4 },
];

export default function ShadowingPanel() {
  const [recorderState, setRecorderState] = useState<'ready' | 'recording' | 'analyzing' | 'playback'>('ready');
  const [activeQuestion, setActiveQuestion] = useState(1);
  const totalQuestions = 901;
  const questions = Array.from({ length: 10 }, (_, i) => i + 1); // Mock first 10 questions

  const handleRecord = () => {
    setRecorderState('recording');
  };

  const handleStop = () => {
    setRecorderState('analyzing');
    setTimeout(() => setRecorderState('playback'), 1500);
  };

  const handleRetry = () => {
    setRecorderState('ready');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col p-4 overflow-y-auto no-scrollbar bg-gray-50"
    >
      <div className="max-w-3xl mx-auto w-full space-y-4">
        {/* 1. Header Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <h2 className="text-lg font-bold text-gray-900">Shadowing</h2>
            <span className="text-gray-500 text-xs">(Câu hỏi {activeQuestion}/{totalQuestions})</span>
          </div>
        </div>

        {/* 2. Question Navigation Bar */}
        <div className="flex items-center gap-2">
          <button className="p-1.5 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition-colors">
            <ChevronLeft size={18} />
          </button>
          
          <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar py-1">
            {questions.map((q) => (
              <button
                key={q}
                onClick={() => setActiveQuestion(q)}
                className={`shrink-0 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                  activeQuestion === q
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Câu: {q}
              </button>
            ))}
            <div className="shrink-0 w-10 h-10 bg-gray-200 rounded-xl opacity-50" />
          </div>

          <button className="p-1.5 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* 3. Transcript Area */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Transcript</h3>
            <div className="flex items-center gap-1 text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md">
              <Clock size={10} />
              Auto-scroll ON
            </div>
          </div>

          <div className="space-y-2">
            {MOCK_TRANSCRIPT.map((line, idx) => {
              const isActive = line.chunkIndex === activeQuestion - 1; // Simplified mapping
              const isFaded = !isActive;
              return (
                <div 
                  key={idx}
                  className={`p-3 rounded-xl transition-all cursor-pointer border-2 ${
                    isActive 
                      ? 'bg-white border-blue-500 shadow-sm scale-[1.01]' 
                      : 'bg-gray-50 border-transparent hover:bg-white hover:border-gray-200'
                  } ${isFaded ? 'opacity-40' : 'opacity-100'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex flex-col items-center mt-0.5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                      <span className="text-[9px] font-mono">0:{line.timestamp.toString().padStart(2, '0')}</span>
                      {isActive && <div className="w-1 h-1 bg-blue-500 rounded-full mt-0.5" />}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm leading-relaxed ${isActive ? 'text-gray-900 font-bold' : 'text-gray-500 font-medium'}`}>
                        {line.text}
                      </p>
                      {isActive && (
                        <button className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg hover:bg-blue-100 transition-colors">
                          <Play size={12} fill="currentColor" />
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

        {/* 4. Audio Settings Bar */}
        <div className="bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm flex items-center justify-center gap-4">
          <button className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600 hover:text-blue-600 transition-colors">
            <Volume2 size={16} />
            Play Original
          </button>
          <div className="h-3 w-px bg-gray-200" />
          <button className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600 hover:text-blue-600 transition-colors">
            <Repeat size={16} />
            Loop
          </button>
          <div className="h-3 w-px bg-gray-200" />
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600">
            Speed
            <select className="bg-gray-100 rounded-md px-1 py-0.5 outline-none text-blue-600 font-bold">
              <option>0.75x</option>
              <option selected>1x</option>
              <option>1.25x</option>
              <option>1.5x</option>
            </select>
          </div>
        </div>

        {/* 5. Recorder Feedback Area */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm min-h-[220px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {recorderState === 'ready' && (
              <motion.div 
                key="ready"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-3"
              >
                <button
                  onClick={handleRecord}
                  className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200 hover:bg-blue-700 hover:scale-105 transition-all active:scale-95 group"
                >
                  <Mic size={28} />
                </button>
                <div className="text-center">
                  <p className="text-xs font-bold text-gray-700">Nhấn để bắt đầu nói</p>
                  <p className="text-[9px] text-gray-400 uppercase tracking-wider mt-0.5">Click để bắt đầu ghi âm</p>
                </div>
              </motion.div>
            )}

            {recorderState === 'recording' && (
              <motion.div 
                key="recording"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-4 w-full"
              >
                <div className="flex items-center gap-2 text-blue-600 text-sm font-bold animate-pulse">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  Recording... 0:03
                </div>
                
                <div className="w-full max-w-sm h-10 bg-blue-50 rounded-xl flex items-center justify-center gap-1 px-3">
                  {[...Array(24)].map((_, i) => (
                    <motion.div 
                      key={i} 
                      animate={{ height: [8, Math.random() * 20 + 8, 8] }}
                      transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                      className="w-1 bg-blue-400 rounded-full" 
                    />
                  ))}
                </div>

                <button
                  onClick={handleStop}
                  className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-200 hover:bg-rose-600 transition-all active:scale-95"
                >
                  <Square size={20} fill="currentColor" />
                </button>
              </motion.div>
            )}

            {recorderState === 'analyzing' && (
              <motion.div 
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3 py-2"
              >
                <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
                <p className="text-xs font-bold text-gray-600">Đang phân tích giọng nói...</p>
              </motion.div>
            )}

            {recorderState === 'playback' && (
              <motion.div 
                key="playback"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full space-y-5"
              >
                {/* Score Display */}
                <div className="flex flex-col items-center gap-1">
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Overall Score</div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-black text-emerald-600">🎯 SCORE: 85% 🟢</span>
                  </div>
                </div>

                {/* Comparison Result (Waveform) */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Volume2 size={10} />
                    ORIGINAL vs YOUR SPEECH
                  </div>
                  <div className="w-full h-12 bg-white border border-gray-200 rounded-xl relative overflow-hidden flex items-center px-3 gap-1">
                    <div className="absolute inset-0 flex items-center px-3 gap-1 opacity-10">
                      {[...Array(40)].map((_, i) => (
                        <div key={i} className="flex-1 bg-gray-400 rounded-full h-0.5" />
                      ))}
                    </div>
                    <div className="relative flex-1 flex items-center gap-1 h-full">
                      {[...Array(40)].map((_, i) => (
                        <div 
                          key={i} 
                          className="flex-1 bg-blue-400 rounded-full" 
                          style={{ height: `${Math.random() * 80 + 20}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Feedback Box */}
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3.5 flex gap-3">
                  <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center shrink-0">
                    <Lightbulb size={16} />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      Shadowing Tip
                    </h4>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      ⚠️ Chú ý nhịp điệu và ngữ điệu của câu. Bạn đang nói hơi nhanh ở đoạn cuối.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}
