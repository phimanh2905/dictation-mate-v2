import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, Play, RotateCcw, Sparkles, ChevronLeft, ChevronRight, 
  Volume2, CheckCircle2, Square, Info, EyeOff, Monitor 
} from 'lucide-react';

type SpeakingState = 'ready' | 'recording' | 'analyzing' | 'result';

export default function SpeakingPanel() {
  const [state, setState] = useState<SpeakingState>('ready');
  const [activeQuestion, setActiveQuestion] = useState(1);
  const totalQuestions = 901;
  const questions = Array.from({ length: 10 }, (_, i) => i + 1); // Mock first 10 questions

  const words = [
    { text: 'the', score: 95, status: 'exact' },
    { text: 'key', score: 100, status: 'exact' },
    { text: 'is', score: 90, status: 'exact' },
    { text: 'to', score: 88, status: 'exact' },
    { text: 'research', score: 75, status: 'close' },
    { text: 'market', score: 92, status: 'exact' },
    { text: 'rates', score: 45, status: 'wrong' },
    { text: 'beforehand', score: 80, status: 'exact' },
  ];

  const handleRecord = () => setState('recording');
  const handleStop = () => {
    setState('analyzing');
    setTimeout(() => setState('result'), 1500);
  };
  const handleRetry = () => setState('ready');
  const handleNextQuestion = () => {
    setActiveQuestion(prev => Math.min(totalQuestions, prev + 1));
    setState('ready');
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
            <h2 className="text-lg font-bold text-gray-900">Phát âm</h2>
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

        {/* 3. Target Sentence Area */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4 text-center">
          <div className="space-y-1">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Target Sentence</h3>
            <p className="text-xl font-bold text-gray-800 leading-relaxed font-mono">
              "the key is to research market rates beforehand"
            </p>
          </div>
          
          <div className="flex justify-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all">
              <Volume2 size={16} />
              Nghe audio chunk
            </button>
            <button className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg font-bold hover:bg-gray-100 transition-all text-[10px]">
              IPA
            </button>
          </div>
        </div>

        {/* 4. Recorder & Results Section */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm min-h-[220px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {state === 'ready' && (
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

            {state === 'recording' && (
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

            {state === 'analyzing' && (
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

            {state === 'result' && (
              <motion.div 
                key="result"
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

                {/* Comparison Result */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Info size={10} />
                    YOUR SPEECH vs TRANSCRIPT
                  </div>
                  <div className="flex flex-wrap justify-center gap-x-2 gap-y-3">
                    {words.map((word, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-0.5">
                        <span className={`text-lg font-bold transition-colors ${
                          word.status === 'exact' ? 'text-emerald-500' : 
                          word.status === 'close' ? 'text-amber-500' : 'text-rose-500'
                        }`}>
                          {word.text}
                        </span>
                        <div className={`w-1 h-1 rounded-full ${
                          word.status === 'exact' ? 'bg-emerald-500' : 
                          word.status === 'close' ? 'bg-amber-500' : 'bg-rose-500'
                        }`} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Feedback Box */}
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3.5 flex gap-3">
                  <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center shrink-0">
                    <Sparkles size={16} />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      Pronunciation Tip
                    </h4>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      ⚠️ <span className="font-bold">"rates"</span> nghe giống <span className="font-bold">"rats"</span>. Luyện âm <span className="font-bold">/eɪ/</span> trong "rates".
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
