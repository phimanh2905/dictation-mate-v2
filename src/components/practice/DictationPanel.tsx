import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, Lightbulb, CheckCircle2, XCircle, RefreshCw, 
  ChevronRight, ChevronLeft, Repeat, Sparkles, Flame,
  EyeOff, Monitor, Play, Video as VideoIcon, Keyboard
} from 'lucide-react';
import { useRegisterAction } from '../../contexts/PracticeActionsContext';
import { usePracticeSettings } from '../../contexts/PracticeSettingsContext';

type DictationStatus = 'idle' | 'correct' | 'wrong';

export default function DictationPanel() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<DictationStatus>('idle');
  const [activeQuestion, setActiveQuestion] = useState(1);
  const registerAction = useRegisterAction();
  const { hideVideo, setHideVideo, setIsSettingsOpen } = usePracticeSettings();
  
  const totalQuestions = 901;
  const questions = Array.from({ length: 10 }, (_, i) => i + 1); // Mock first 10 questions

  const checkAnswer = () => {
    if (input.toLowerCase().trim() === 'the key is to research market rates beforehand') {
      setStatus('correct');
    } else {
      setStatus('wrong');
    }
  };

  useEffect(() => {
    registerAction('checkAnswer', checkAnswer);
  }, [input, registerAction]);

  const handleRetry = () => {
    setStatus('idle');
    setInput('');
  };

  // Mock hint words for visualization
  const hintWords = [
    { length: 3 },
    { length: 7 },
    { length: 2 },
    { length: 1 },
    { length: 6 },
    { length: 3 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col p-4 overflow-y-auto no-scrollbar bg-gray-50"
    >
      <div className="max-w-3xl mx-auto w-full space-y-4">
        {/* 1. Header Title & Utility Buttons */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <h2 className="text-lg font-bold text-gray-900">Chép chính tả</h2>
            <span className="text-gray-500 text-xs">(Câu hỏi {activeQuestion}/{totalQuestions})</span>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setHideVideo(!hideVideo)}
              className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-xs font-medium transition-colors shadow-sm ${
                hideVideo 
                  ? 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {hideVideo ? <VideoIcon size={14} /> : <EyeOff size={14} />}
              {hideVideo ? 'Hiện video' : 'Ẩn video'}
            </button>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Keyboard size={14} />
              Phím tắt
            </button>
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

        {/* 3. Input Area */}
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (status !== 'idle') setStatus('idle');
            }}
            placeholder="Nhập những gì bạn nghe được..."
            className={`w-full h-24 p-3 rounded-xl text-base font-medium font-mono transition-all focus:outline-none border-2 ${
              status === 'correct' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' :
              status === 'wrong' ? 'border-rose-500 bg-rose-50 text-rose-700' :
              'border-gray-300 bg-gray-50 text-gray-700 focus:border-blue-500 focus:bg-white'
            } resize-none`}
          />
        </div>

        {/* 4. Hint Visualization (Dashed Boxes) */}
        <div className="flex flex-wrap gap-2">
          {hintWords.map((word, idx) => (
            <div 
              key={idx} 
              className="px-2 py-1 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center min-w-[32px]"
            >
              <span className="text-rose-500 font-bold tracking-widest text-sm">
                {Array(word.length).fill('*').join('')}
              </span>
            </div>
          ))}
        </div>

        {/* 5. Bottom Controls */}
        <div className="flex items-center gap-3 pt-2">
          <button className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
            <Lightbulb size={20} />
          </button>
          
          <button 
            onClick={checkAnswer}
            className="flex-1 h-12 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-md shadow-blue-100 active:scale-[0.98]"
          >
            <Play size={20} fill="currentColor" />
            Phát lại
          </button>

          <button 
            className={`px-6 h-12 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              status === 'correct' 
                ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            Tiếp
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Feedback Messages */}
        <AnimatePresence>
          {status === 'correct' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-700 font-bold"
            >
              <CheckCircle2 size={20} />
              Chính xác! Bạn đã hoàn thành câu hỏi này.
            </motion.div>
          )}
          {status === 'wrong' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-700 font-bold"
            >
              <XCircle size={20} />
              Chưa đúng, hãy thử nghe lại nhé!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
