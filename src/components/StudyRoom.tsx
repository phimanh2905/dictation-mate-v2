import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  Music, 
  Volume2, 
  VolumeX,
  Layout, 
  ChevronRight,
  Smile,
  Zap,
  Coffee,
  Brain,
  Target,
  Clock,
  Sparkles,
  Flame,
  CloudRain,
  Trees,
  Waves,
  FileText,
  CheckCircle2,
  X
} from 'lucide-react';
import { Page, Mood } from '../types';

interface StudySession {
  id: string;
  duration: number;
  completed: boolean;
  time: string;
  hasNotes: boolean;
  xpEarned: number;
}

interface KanbanItem {
  id: string;
  title: string;
  level: string;
  progress: number;
  status: 'todo' | 'learning' | 'mastered';
}

interface StudyRoomProps {
  onNavigate: (page: Page) => void;
}

export default function StudyRoom({ onNavigate }: StudyRoomProps) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [totalTime, setTotalTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mood, setMood] = useState<Mood>('Focused');
  const [activeSound, setActiveSound] = useState('lofi');
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [sessionNotes, setSessionNotes] = useState('');
  
  // Daily Progress State
  const [completedMinutes, setCompletedMinutes] = useState(45);
  const targetMinutes = 60;

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setShowCompleteModal(true);
      setCompletedMinutes(prev => Math.min(targetMinutes, prev + Math.floor(totalTime / 60)));
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, totalTime]);

  // Update browser tab title
  useEffect(() => {
    if (isActive) {
      document.title = `⏱️ ${formatTime(timeLeft)} - Focusing`;
    } else {
      document.title = 'Dictation Mate';
    }
    return () => { document.title = 'Dictation Mate'; };
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    if (!isActive) {
      setIsActive(true);
      setIsPaused(false);
    } else {
      setIsActive(false);
      setIsPaused(true);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(totalTime);
  };

  const setDuration = (seconds: number) => {
    setIsActive(false);
    setIsPaused(false);
    setTotalTime(seconds);
    setTimeLeft(seconds);
  };

  const moods: { type: Mood; icon: any; color: string; description: string }[] = [
    { type: 'Focused', icon: Brain, color: 'blue', description: 'Ready for deep learning' },
    { type: 'Confident', icon: Zap, color: 'yellow', description: 'Feeling like an expert' },
    { type: 'Curious', icon: Target, color: 'purple', description: 'Want to explore new things' },
    { type: 'Tired', icon: Coffee, color: 'orange', description: 'Need something light' },
    { type: 'Stressed', icon: Smile, color: 'emerald', description: 'Relaxing practice' },
    { type: 'Busy', icon: Clock, color: 'rose', description: 'Quick 5-min sessions' },
  ];

  const todaySessions: StudySession[] = [
    { id: '1', duration: 25, completed: true, time: '09:30 AM', hasNotes: true, xpEarned: 50 },
    { id: '2', duration: 25, completed: true, time: '11:15 AM', hasNotes: false, xpEarned: 50 },
  ];

  const kanbanItems: KanbanItem[] = [
    { id: '1', title: 'Salary Negotiation', level: 'B2', progress: 0, status: 'todo' },
    { id: '2', title: 'Startup Pitch', level: 'B2', progress: 0, status: 'todo' },
    { id: '3', title: 'Email Writing', level: 'B1', progress: 30, status: 'learning' },
    { id: '4', title: 'Meeting Vocab', level: 'B1', progress: 100, status: 'mastered' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            Study Room
            <Sparkles size={24} className="text-amber-400" />
          </h1>
          <p className="text-gray-500">Your personal focus space</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Streak */}
          <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-xl border border-orange-100">
            <Flame size={20} className="text-orange-500" fill="currentColor" />
            <span className="font-bold text-orange-700">12 days</span>
          </div>
          
          {/* Daily Progress Mini */}
          <div className="px-4 py-2 bg-blue-50 rounded-xl min-w-[180px] border border-blue-100">
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-gray-500 uppercase tracking-wider">Today</span>
              <span className="text-blue-600">{completedMinutes}/{targetMinutes}m</span>
            </div>
            <div className="h-1.5 bg-blue-200 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(completedMinutes / targetMinutes) * 100}%` }}
                className="h-full bg-blue-500 rounded-full" 
              />
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* LEFT COLUMN: Focus Area */}
        <div className="lg:col-span-3 space-y-8">
          <section className="bg-white rounded-3xl border border-gray-200 p-8 md:p-12 shadow-sm flex flex-col items-center relative overflow-hidden">
            {/* Timer Presets */}
            <div className="flex justify-center gap-2 mb-12 relative z-10">
              {[15, 25, 45, 60].map((min) => (
                <button
                  key={min}
                  onClick={() => setDuration(min * 60)}
                  className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                    totalTime === min * 60 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {min}m
                </button>
              ))}
            </div>

            {/* Circular Timer */}
            <div className="relative w-72 h-72 mx-auto mb-12 z-10">
              <svg className="w-full h-full transform -rotate-90">
                {/* Background ring */}
                <circle 
                  cx="144" 
                  cy="144" 
                  r="130" 
                  fill="none" 
                  stroke="#f3f4f6" 
                  strokeWidth="12" 
                />
                {/* Progress ring */}
                <motion.circle
                  cx="144"
                  cy="144"
                  r="130"
                  fill="none"
                  stroke={isActive ? "#3b82f6" : "#fbbf24"}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 130}`}
                  animate={{ strokeDashoffset: 2 * Math.PI * 130 * (1 - timeLeft / totalTime) }}
                  transition={{ duration: 1, ease: "linear" }}
                />
              </svg>
              
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-7xl font-mono font-light text-gray-900 tabular-nums tracking-tighter">
                  {formatTime(timeLeft)}
                </span>
                <span className={`text-sm font-bold uppercase tracking-widest mt-2 ${isActive ? 'text-blue-500' : 'text-gray-400'}`}>
                  {isActive ? 'Focusing...' : isPaused ? 'Paused' : 'Ready to start'}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 relative z-10">
              <button 
                onClick={toggleTimer}
                className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all active:scale-95 ${
                  isActive 
                    ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
                }`}
              >
                {isActive ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-1" />}
              </button>
              <button 
                onClick={resetTimer}
                className="w-14 h-14 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-all active:scale-95"
              >
                <RotateCcw size={24} />
              </button>
            </div>

            {/* Background decoration */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${isActive ? 'opacity-5' : 'opacity-0'}`}>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400 to-violet-500 animate-pulse"></div>
            </div>
          </section>

          {/* Quick Start Recommendations */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recommended for your mood</h2>
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mood: {mood}</span>
                <Smile size={18} className="text-blue-600" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'v1', title: 'Professional Email Etiquette', level: 'B1', duration: '12:45', thumbnail: 'https://picsum.photos/seed/email/300/200' },
                { id: 'v2', title: 'Startup Pitch Masterclass', level: 'C1', duration: '18:20', thumbnail: 'https://picsum.photos/seed/pitch/300/200' },
              ].map((video) => (
                <div 
                  key={video.id}
                  onClick={() => onNavigate('practice')}
                  className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center gap-4 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all group"
                >
                  <div className="w-24 aspect-video rounded-xl overflow-hidden flex-shrink-0 relative">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                      <Play size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm truncate group-hover:text-blue-600">{video.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded uppercase">{video.level}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{video.duration}</span>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-300 group-hover:text-blue-600" />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Environment Panel */}
        <div className="lg:col-span-2 space-y-8">
          {/* Today's Progress Card */}
          <section className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-3xl p-6 border border-blue-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Target size={20} className="text-blue-500" />
                Today's Goal
              </h3>
              <span className="text-sm font-black text-blue-600">
                {completedMinutes}/{targetMinutes} min
              </span>
            </div>
            
            <div className="h-3 bg-blue-200 rounded-full overflow-hidden mb-4 border border-blue-200/50">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(completedMinutes / targetMinutes) * 100}%` }}
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)]"
              />
            </div>
            
            <p className="text-sm text-blue-700 font-medium">
              {targetMinutes - completedMinutes > 0 
                ? `${targetMinutes - completedMinutes} min more to reach your goal! 🎯`
                : "Goal reached! Great job today! 🎉"
              }
            </p>
          </section>

          {/* Background Sounds Card */}
          <section className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Music size={16} />
              Background Sounds
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'lofi', name: 'Lo-Fi', icon: Music, color: 'purple', bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' },
                { id: 'rain', name: 'Rain', icon: CloudRain, color: 'blue', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
                { id: 'cafe', name: 'Cafe', icon: Coffee, color: 'amber', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' },
                { id: 'forest', name: 'Forest', icon: Trees, color: 'emerald', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' },
                { id: 'waves', name: 'Waves', icon: Waves, color: 'cyan', bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-700' },
                { id: 'white', name: 'White Noise', icon: Volume2, color: 'gray', bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700' },
              ].map((sound) => (
                <button
                  key={sound.id}
                  onClick={() => setActiveSound(sound.id)}
                  className={`p-3.5 rounded-2xl border-2 transition-all flex items-center gap-2.5 ${
                    activeSound === sound.id
                      ? `${sound.bg} ${sound.border} shadow-sm`
                      : 'border-gray-50 bg-gray-50/50 hover:border-gray-200'
                  }`}
                >
                  <sound.icon 
                    size={18} 
                    className={activeSound === sound.id ? sound.text : 'text-gray-400'} 
                  />
                  <span className={`font-bold text-xs ${activeSound === sound.id ? sound.text : 'text-gray-600'}`}>
                    {sound.name}
                  </span>
                  {activeSound === sound.id && (
                    <div className="ml-auto flex gap-0.5">
                      <motion.span animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-0.5 bg-current rounded-full" />
                      <motion.span animate={{ height: [8, 4, 8] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-0.5 bg-current rounded-full" />
                      <motion.span animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-0.5 bg-current rounded-full" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            {/* Volume Slider */}
            <div className="mt-6 flex items-center gap-4">
              <VolumeX size={16} className="text-gray-400" />
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden cursor-pointer relative group">
                <div className="absolute inset-0 bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="h-full w-2/3 bg-blue-500 rounded-full relative z-10" />
              </div>
              <Volume2 size={16} className="text-gray-400" />
            </div>
          </section>

          {/* Mood Selector (Compact) */}
          <section className="bg-white rounded-3xl border border-gray-200 p-4 shadow-sm">
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {moods.map((m) => (
                <button
                  key={m.type}
                  onClick={() => setMood(m.type)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all border-2 ${
                    mood === m.type 
                      ? `bg-${m.color}-50 border-${m.color}-200 shadow-sm` 
                      : 'bg-gray-50 border-transparent hover:bg-gray-100'
                  }`}
                >
                  <m.icon size={18} className={mood === m.type ? `text-${m.color}-500` : 'text-gray-400'} />
                  <span className={`font-bold text-xs ${mood === m.type ? 'text-gray-900' : 'text-gray-600'}`}>
                    {m.type}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Session History Card */}
          <section className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">
              Today's Sessions
            </h3>
            
            <div className="space-y-3">
              {todaySessions.map((session) => (
                <div 
                  key={session.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:bg-white hover:shadow-md transition-all"
                >
                  <div className={`w-2.5 h-2.5 rounded-full ${session.completed ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]'}`} />
                  <div className="flex-1">
                    <p className="font-bold text-sm text-gray-900">
                      {session.duration} min focus
                    </p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{session.time}</p>
                  </div>
                  {session.hasNotes && (
                    <FileText size={16} className="text-blue-400" />
                  )}
                  <span className="text-xs font-black text-emerald-600">+{session.xpEarned} XP</span>
                </div>
              ))}
              
              {todaySessions.length === 0 && (
                <div className="text-center py-8">
                  <Clock size={32} className="text-gray-200 mx-auto mb-2" />
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    No sessions yet today
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* KANBAN BOARD SECTION */}
      <section className="bg-white rounded-[2rem] border border-gray-200 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
              <Layout size={20} />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-gray-900">Learning Board</h2>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95">
            + Add Item
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* To Learn Column */}
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                To Learn
                <span className="w-5 h-5 bg-gray-200 text-gray-500 text-[10px] font-black rounded-full flex items-center justify-center">5</span>
              </span>
            </div>
            <div className="space-y-4">
              {kanbanItems.filter(i => i.status === 'todo').map(item => (
                <KanbanCard 
                  key={item.id} 
                  title={item.title} 
                  level={item.level} 
                  progress={item.progress} 
                />
              ))}
            </div>
          </div>

          {/* Learning Column */}
          <div className="bg-blue-50/50 rounded-3xl p-6 border-2 border-blue-100 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white text-[10px] font-black rounded-full shadow-lg flex items-center gap-1.5">
              <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1.5 h-1.5 bg-white rounded-full" />
              ACTIVE
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-blue-500 uppercase tracking-widest flex items-center gap-2">
                Learning
                <span className="w-5 h-5 bg-blue-100 text-blue-600 text-[10px] font-black rounded-full flex items-center justify-center">2</span>
              </span>
            </div>
            <div className="space-y-4">
              {kanbanItems.filter(i => i.status === 'learning').map(item => (
                <KanbanCard 
                  key={item.id} 
                  title={item.title} 
                  level={item.level} 
                  progress={item.progress} 
                  active 
                />
              ))}
            </div>
          </div>

          {/* Mastered Column */}
          <div className="bg-emerald-50/50 rounded-3xl p-6 border border-emerald-100">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                Mastered
                <span className="w-5 h-5 bg-emerald-100 text-emerald-600 text-[10px] font-black rounded-full flex items-center justify-center">47</span>
              </span>
            </div>
            <div className="space-y-4 opacity-70">
              {kanbanItems.filter(i => i.status === 'mastered').map(item => (
                <KanbanCard 
                  key={item.id} 
                  title={item.title} 
                  level={item.level} 
                  progress={item.progress} 
                  mastered 
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* POST-SESSION MODAL */}
      <AnimatePresence>
        {showCompleteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCompleteModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl border border-gray-100"
            >
              <button 
                onClick={() => setShowCompleteModal(false)}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>

              {/* Celebration */}
              <div className="text-center mb-8">
                <motion.div 
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="w-24 h-24 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-100"
                >
                  <CheckCircle2 size={48} className="text-emerald-500" />
                </motion.div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Session Complete! 🎉</h2>
                <p className="text-gray-500 font-medium mt-2">You focused for {Math.floor(totalTime / 60)} minutes</p>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center p-5 bg-gray-50 rounded-3xl border border-gray-100">
                  <p className="text-4xl font-black text-gray-900">{Math.floor(totalTime / 60)}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Minutes</p>
                </div>
                <div className="text-center p-5 bg-emerald-50 rounded-3xl border border-emerald-100">
                  <p className="text-4xl font-black text-emerald-600">+{Math.floor(totalTime / 30)}</p>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-1">XP Earned</p>
                </div>
              </div>
              
              {/* Session Notes */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">
                  Session Notes <span className="text-gray-300 font-normal">(Optional)</span>
                </label>
                <textarea 
                  placeholder="What did you learn? How do you feel?"
                  rows={3}
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium transition-all"
                />
              </div>
              
              {/* Actions */}
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    setShowCompleteModal(false);
                    setDuration(5 * 60);
                    setIsActive(true);
                  }}
                  className="w-full py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Coffee size={18} />
                  Take 5min Break
                </button>
                <button 
                  onClick={() => setShowCompleteModal(false)}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface KanbanCardProps {
  title: string;
  level: string;
  progress: number;
  active?: boolean;
  mastered?: boolean;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ title, level, progress, active = false, mastered = false }) => {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className={`p-5 rounded-2xl border bg-white shadow-sm cursor-grab active:cursor-grabbing transition-all ${
        active ? 'border-blue-300 ring-4 ring-blue-500/5 shadow-md' : 
        mastered ? 'border-emerald-200' : 'border-gray-100'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`text-[10px] font-bold uppercase tracking-wider ${active ? 'text-blue-500' : 'text-gray-400'}`}>{level}</span>
        {mastered && <Zap size={14} className="text-emerald-500" fill="currentColor" />}
      </div>
      <h4 className="font-bold text-gray-900 text-sm mb-4 leading-tight">{title}</h4>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className={`h-full rounded-full ${
            mastered ? 'bg-emerald-500' : active ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-gray-300'
          }`}
        />
      </div>
    </motion.div>
  );
}
