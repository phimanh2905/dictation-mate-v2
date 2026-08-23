import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, Play, RotateCcw, Sparkles, ChevronRight, 
  Volume2, CheckCircle2, Square, Info, EyeOff, 
  ChevronDown, ChevronUp, Check, AlertTriangle, X 
} from 'lucide-react';
import { RecordingState, AssessmentWord } from '../../types';

interface RecordingAreaProps {
  state: RecordingState;
  onRecord: () => void;
  onStop: () => void;
  onRetry: () => void;
  onNext: () => void;
  accuracy: number;
  attemptCount: number;
  referenceText: string;
  words: AssessmentWord[];
  userSpeech: string;
  feedback: string;
  aiFeedbackDetail: string;
  recordedAudioUrl?: string;
  className?: string;
}

export default function RecordingArea({
  state,
  onRecord,
  onStop,
  onRetry,
  onNext,
  accuracy,
  attemptCount,
  referenceText,
  words,
  userSpeech,
  feedback,
  aiFeedbackDetail,
  recordedAudioUrl,
  className = ""
}: RecordingAreaProps) {
  return (
    <div className={`flex-1 flex flex-col min-h-0 ${className}`}>
      <div className="flex-1 overflow-y-auto no-scrollbar py-4">
        <AnimatePresence mode="wait">
          {state === 'idle' && (
            <motion.div 
              key="idle"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center gap-6 py-12"
            >
              <button
                onClick={onRecord}
                className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:scale-105 transition-all active:scale-95 group relative"
              >
                <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-20" />
                <Mic size={40} className="relative z-10" />
              </button>
              <div className="text-center space-y-1">
                <p className="text-lg font-bold text-slate-800">Ready to speak?</p>
                <p className="text-sm text-slate-400 font-medium uppercase tracking-widest">Click or press Space to start</p>
              </div>
            </motion.div>
          )}

          {state === 'recording' && (
            <motion.div 
              key="recording"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center gap-12 w-full py-8"
            >
              <div className="flex items-center gap-3 px-4 py-2 bg-rose-50 rounded-full border border-rose-100">
                <div className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                <span className="text-rose-600 text-sm font-black uppercase tracking-widest">Recording... 0:04 / 0:10</span>
              </div>
              
              <div className="w-full max-w-md h-24 flex items-center justify-center gap-1.5 px-4 overflow-hidden">
                {[...Array(40)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    animate={{ 
                      height: [
                        12, 
                        Math.random() * (i > 15 && i < 25 ? 80 : 30) + 12, 
                        12
                      ],
                      opacity: [0.4, 1, 0.4]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 0.4 + Math.random() * 0.4, 
                      delay: i * 0.02 
                    }}
                    className="w-1.5 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.3)]" 
                  />
                ))}
              </div>

              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={onStop}
                  className="w-20 h-20 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-2xl shadow-rose-200 hover:bg-rose-600 transition-all active:scale-95 group relative"
                >
                  <div className="absolute inset-0 bg-rose-500 rounded-full animate-pulse opacity-30" />
                  <Square size={28} fill="currentColor" className="relative z-10" />
                </button>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Press Space to Stop</p>
              </div>
            </motion.div>
          )}

          {state === 'evaluating' && (
            <motion.div 
              key="evaluating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center gap-6 py-20"
            >
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-blue-100 rounded-full" />
                <div className="absolute inset-0 border-4 border-t-blue-600 rounded-full animate-spin" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm font-bold text-slate-700 uppercase tracking-widest">AI is evaluating...</p>
                <p className="text-xs text-slate-400">Comparing your pronunciation to the native speaker</p>
              </div>
            </motion.div>
          )}

          {state === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full space-y-4"
            >
              {/* Unified Result Card with 3 rows */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
                {/* Row 1: Score & Audio Comparison */}
                <div className="p-6 flex items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    {/* Score Ring */}
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="32" cy="32" r="28" className="stroke-slate-100 fill-none" strokeWidth="6" />
                        <motion.circle 
                          cx="32" cy="32" r="28" 
                          className="stroke-blue-600 fill-none" 
                          strokeWidth="6" 
                          strokeLinecap="round"
                          initial={{ strokeDasharray: "176", strokeDashoffset: "176" }}
                          animate={{ strokeDashoffset: 176 - (176 * accuracy) / 100 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-base font-black text-slate-900">{accuracy}%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-0.5">
                      <h4 className="text-base font-bold text-slate-900 leading-tight">Good effort!</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{attemptCount}/{3} attempts</p>
                    </div>
                  </div>

                  <div className="flex-1 flex items-center gap-2 max-w-[280px]">
                    <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 transition-colors group">
                      <Play size={12} fill="currentColor" className="text-slate-900 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-slate-700 whitespace-nowrap">Native</span>
                    </button>
                    <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-xl border border-blue-100">
                      <Volume2 size={12} className="text-blue-600" />
                      <div className="flex-1 h-5 flex items-center gap-0.5">
                        {[...Array(12)].map((_, i) => (
                          <div key={i} className="flex-1 bg-blue-300 rounded-full" style={{ height: `${Math.random() * 80 + 20}%` }} />
                        ))}
                      </div>
                      <span className="text-[9px] font-mono font-bold text-blue-600">0:08</span>
                    </div>
                  </div>
                </div>

                {/* Row 2: Word-by-word Assessment */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {words.map((word, idx) => (
                      <button 
                        key={idx}
                        className={`group px-3 py-1.5 rounded-xl border-2 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 ${
                          word.isCorrect 
                            ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                            : 'bg-rose-50 border-rose-100 text-rose-700'
                        }`}
                      >
                        <span className="text-xs font-bold">{word.text}</span>
                        {word.isCorrect ? <Check size={12} strokeWidth={3} className="text-emerald-500" /> : <X size={12} strokeWidth={3} className="text-rose-500" />}
                        
                        {!word.isCorrect && word.ipa && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            IPA: {word.ipa}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Row 3: AI Tip Box */}
                <div className="p-4 bg-blue-50/30">
                  <div className="flex items-center gap-3">
                    <Sparkles size={14} className="text-blue-500 shrink-0" />
                    <p className="text-xs font-medium text-slate-600">
                      <span className="font-bold text-blue-600 mr-1">💡 AI Tip:</span> 
                      Pay attention to the ending sound /ʃ/ in 'English' and the stress on 'listening'.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky Bottom Action Bar */}
      <footer className="h-14 bg-white border-t border-slate-100 px-6 flex items-center justify-between shrink-0 -mx-10 mt-auto">
        <button 
          onClick={onRetry}
          disabled={state !== 'result'}
          className="flex items-center gap-2 px-4 py-2 border-2 border-slate-100 rounded-xl text-xs font-black text-slate-400 hover:bg-slate-50 hover:border-slate-200 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          <RotateCcw size={14} />
          Try Again <span className="text-slate-300 ml-1 font-bold">(Space)</span>
        </button>

        <button 
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-black hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-100"
        >
          Next Sentence <span className="text-blue-200 ml-1 font-bold">(Enter ↵)</span>
          <ChevronRight size={14} strokeWidth={3} />
        </button>
      </footer>
    </div>
  );
}

