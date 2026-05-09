import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Clock, 
  ChevronLeft, ChevronRight, Repeat, Volume2
} from 'lucide-react';
import { TranscriptLine } from '../../types';
import RecordingArea, { RecordingState } from './RecordingArea';

const MOCK_TRANSCRIPT: TranscriptLine[] = [
  { timestamp: 0, text: "Welcome to this lesson on salary negotiation.", chunkIndex: 0 },
  { timestamp: 5, text: "Today we'll cover the most important strategies.", chunkIndex: 1 },
  { timestamp: 10, text: "First, you need to understand your market value.", chunkIndex: 2 },
  { timestamp: 15, text: "The key is to research market rates beforehand.", chunkIndex: 3 },
  { timestamp: 20, text: "This gives you a strong foundation for your request.", chunkIndex: 4 },
];

export default function ShadowingPanel() {
  const [recorderState, setRecorderState] = useState<RecordingState>('ready');
  const [activeQuestion, setActiveQuestion] = useState(1);
  const totalQuestions = 901;
  const questions = Array.from({ length: 10 }, (_, i) => i + 1); // Mock first 10 questions

  const words = [
    { text: "Welcome", status: "exact" as const, ipa: "ˈwɛlkəm" },
    { text: "to", status: "exact" as const, ipa: "tuː" },
    { text: "this", status: "exact" as const, ipa: "ðɪs" },
    { text: "lesson", status: "exact" as const, ipa: "ˈlɛsən" },
    { text: "on", status: "exact" as const, ipa: "ɒn" },
    { text: "salary", status: "close" as const, ipa: "ˈsæləri" },
    { text: "negotiation", status: "wrong" as const, ipa: "nɪˌɡəʊʃiˈeɪʃən" }
  ];

  const handleRecord = () => {
    setRecorderState('recording');
  };

  const handleStop = () => {
    setRecorderState('analyzing');
    setTimeout(() => setRecorderState('result'), 1500);
  };

  const handleRetry = () => {
    setRecorderState('ready');
  };

  const handleNextQuestion = () => {
    setActiveQuestion(prev => Math.min(totalQuestions, prev + 1));
    setRecorderState('ready');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col p-4 overflow-y-auto no-scrollbar bg-gray-50 dark:bg-gray-950"
    >
      <div className="max-w-3xl mx-auto w-full space-y-4 pb-20 lg:pb-4">
        {/* 1. Header Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Shadowing</h2>
            <span className="text-gray-500 text-xs">(Câu hỏi {activeQuestion}/{totalQuestions})</span>
          </div>
        </div>

        {/* 2. Question Navigation Bar */}
        <div className="flex items-center gap-2">
          <button className="p-1.5 bg-gray-200 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
            <ChevronLeft size={18} />
          </button>
          
          <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar py-1">
            {questions.map((q) => (
              <button
                key={q}
                onClick={() => setActiveQuestion(q)}
                className={`shrink-0 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                  activeQuestion === q
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-100 dark:shadow-none'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                Câu: {q}
              </button>
            ))}
            <div className="shrink-0 w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-xl opacity-50" />
          </div>

          <button className="p-1.5 bg-gray-200 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* 3. Transcript Area */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Transcript</h3>
            <div className="flex items-center gap-1 text-[9px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded-md">
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
                      ? 'bg-white dark:bg-gray-800 border-blue-500 shadow-sm scale-[1.01]' 
                      : 'bg-gray-50 dark:bg-gray-900 border-transparent hover:bg-white dark:hover:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
                  } ${isFaded ? 'opacity-40' : 'opacity-100'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex flex-col items-center mt-0.5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
                      <span className="text-[9px] font-mono">0:{line.timestamp.toString().padStart(2, '0')}</span>
                      {isActive && <div className="w-1 h-1 bg-blue-500 rounded-full mt-0.5" />}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm leading-relaxed ${isActive ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-500 dark:text-gray-400 font-medium'}`}>
                        {line.text}
                      </p>
                      {isActive && (
                        <button className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
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
        <div className="bg-white dark:bg-gray-900 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-center gap-4">
          <button className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Volume2 size={16} />
            Play Original
          </button>
          <div className="h-3 w-px bg-gray-200 dark:bg-gray-800" />
          <button className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Repeat size={16} />
            Loop
          </button>
          <div className="h-3 w-px bg-gray-200 dark:bg-gray-800" />
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600 dark:text-gray-400">
            Speed
            <select className="bg-gray-100 dark:bg-gray-800 rounded-md px-1 py-0.5 outline-none text-blue-600 dark:text-blue-400 font-bold border-none">
              <option>0.75x</option>
              <option value="1">1x</option>
              <option>1.25x</option>
              <option>1.5x</option>
            </select>
          </div>
        </div>

        {/* 5. Recorder Feedback Area (Redesigned) */}
        <RecordingArea 
          state={recorderState}
          onRecord={handleRecord}
          onStop={handleStop}
          onRetry={handleRetry}
          onNext={handleNextQuestion}
          accuracy={72}
          attemptCount={2}
          referenceText={MOCK_TRANSCRIPT[activeQuestion - 1]?.text || ""}
          words={words}
          userSpeech="Welcome to this lesson on salary negoshion."
          feedback="Chú ý nhịp điệu và ngữ điệu. Bạn đang nói hơi nhanh ở đoạn cuối."
          aiFeedbackDetail="Bạn đã bắt nhịp khá tốt với video. Tuy nhiên, từ 'negotiation' bị phát âm sai ở âm cuối (tion). Hãy chú ý âm /ʃ/ mạnh hơn. Ngoài ra, việc ngắt nghỉ giữa các cụm từ (chunking) cần tự nhiên hơn để giống với người bản xứ."
          recordedAudioUrl="https://www.soundjay.com/buttons/beep-07.mp3"
        />

      </div>
    </motion.div>
  );
}
