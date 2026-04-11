import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Flame, Clock, Star, Target, Zap, Headphones, 
  Mic, BookOpen, PenTool, Lightbulb, CheckCircle2, 
  Trophy, Share2, Edit3, ChevronRight, Calendar, User,
  BarChart3 as BarChart
} from 'lucide-react';

interface UserProfile {
  name: string;
  avatar: string;
  level: string;
  joinedDate: string;
}

interface UserStats {
  streak: number;
  totalHours: number;
  totalXP: number;
  level: string;
  levelName: string;
}

interface DailyGoal {
  target: number;
  current: number;
}

interface HeatmapDay {
  date: string;
  minutes: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ChartData {
  label: string;
  minutes: number;
}

interface Skill {
  name: string;
  level: number;
  color: string;
  barColor: string;
  icon: any;
}

interface Activity {
  id: string;
  title: string;
  timestamp: string;
  icon: any;
  iconBg: string;
  iconColor: string;
}

// Mock Data
const userProfile: UserProfile = {
  name: 'Alex Johnson',
  avatar: 'https://picsum.photos/seed/alex/200/200',
  level: 'B2',
  joinedDate: 'April 2024',
};

const userStats: UserStats = {
  streak: 12,
  totalHours: 47,
  totalXP: 12450,
  level: 'B2',
  levelName: 'Intermediate',
};

const dailyGoal: DailyGoal = {
  target: 200,
  current: 130,
};

const skills: Skill[] = [
  { name: 'Listening', level: 78, color: 'text-blue-500', barColor: 'bg-blue-500', icon: Headphones },
  { name: 'Speaking', level: 45, color: 'text-purple-500', barColor: 'bg-purple-500', icon: Mic },
  { name: 'Reading', level: 65, color: 'text-emerald-500', barColor: 'bg-emerald-500', icon: BookOpen },
  { name: 'Writing', level: 52, color: 'text-amber-500', barColor: 'bg-amber-500', icon: PenTool },
];

const activities: Activity[] = [
  { id: '1', title: 'Completed Business English video', timestamp: '2 hours ago', icon: CheckCircle2, iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
  { id: '2', title: 'Mastered 5 words in TOEIC collection', timestamp: '5 hours ago', icon: Star, iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  { id: '3', title: 'Earned "First Streak" achievement', timestamp: 'Yesterday', icon: Trophy, iconBg: 'bg-amber-100', iconColor: 'text-amber-600' },
  { id: '4', title: 'Reached 10,000 XP milestone', timestamp: '2 days ago', icon: Zap, iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
  { id: '5', title: 'Practiced Speaking for 30 minutes', timestamp: '3 days ago', icon: Mic, iconBg: 'bg-rose-100', iconColor: 'text-rose-600' },
];

const chartData: ChartData[] = [
  { label: 'Mon', minutes: 45 },
  { label: 'Tue', minutes: 120 },
  { label: 'Wed', minutes: 30 },
  { label: 'Thu', minutes: 90 },
  { label: 'Fri', minutes: 60 },
  { label: 'Sat', minutes: 150 },
  { label: 'Sun', minutes: 45 },
];

// Generate heatmap data (last 26 weeks for mobile, 52 for desktop)
const generateHeatmap = () => {
  const weeks = [];
  for (let i = 0; i < 52; i++) {
    const days = [];
    for (let j = 0; j < 7; j++) {
      const level = Math.floor(Math.random() * 5) as 0 | 1 | 2 | 3 | 4;
      days.push({
        date: `2024-W${i}-D${j}`,
        minutes: level * 20,
        level
      });
    }
    weeks.push({ days });
  }
  return weeks;
};

const heatmapData = generateHeatmap();

export default function StatisticsPage({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [activePeriod, setActivePeriod] = useState('Week');
  
  const masteredPercent = 0.63;
  const learningPercent = 0.27;
  const maxMinutes = Math.max(...chartData.map(d => d.minutes));

  const getHeatmapColor = (level: 0 | 1 | 2 | 3 | 4) => {
    const colors = {
      0: 'bg-gray-100',
      1: 'bg-blue-200',
      2: 'bg-blue-400',
      3: 'bg-blue-600',
      4: 'bg-blue-800',
    };
    return colors[level];
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Simple Greeting Header - REPLACES complex profile section */}
      <section className="flex items-center justify-between bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart size={16} className="text-blue-600" />
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Statistics</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Good morning, Alex! 👋</h1>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            <Flame size={16} className="text-orange-500" fill="currentColor" />
            You're on a 12-day streak
          </p>
        </div>
        
        {/* Quick Profile Link */}
        <button 
          onClick={() => onNavigate('profile')}
          className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-2xl transition-all group"
        >
          <div className="text-right hidden sm:block">
            <p className="font-bold text-gray-900 text-sm">Alex Johnson</p>
            <p className="text-xs text-gray-400">View Profile →</p>
          </div>
          <div className="relative">
            <img 
              src={userProfile.avatar} 
              alt="User" 
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 group-hover:border-blue-300 transition-colors"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white">
              B2
            </div>
          </div>
        </button>
      </section>

      {/* Stats Overview Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak Card */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm group cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
              <Flame size={28} fill="currentColor" />
            </div>
            <div>
              <p className="text-3xl font-black text-gray-900">{userStats.streak}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Day Streak</p>
            </div>
          </div>
        </motion.div>
        
        {/* Study Time Card */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm group cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <Clock size={28} />
            </div>
            <div>
              <p className="text-3xl font-black text-gray-900">{userStats.totalHours}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Hours Studied</p>
            </div>
          </div>
        </motion.div>
        
        {/* XP Card */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm group cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
              <Star size={28} fill="currentColor" />
            </div>
            <div>
              <p className="text-3xl font-black text-gray-900">{(userStats.totalXP / 1000).toFixed(1)}K</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Total XP</p>
            </div>
          </div>
        </motion.div>
        
        {/* Level Card */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm group cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
              <Target size={28} />
            </div>
            <div>
              <p className="text-3xl font-black text-gray-900">{userStats.level}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{userStats.levelName}</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Daily Goal Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                <Zap size={28} fill="currentColor" className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight">Daily Goal</h2>
                <p className="text-blue-100 font-medium">Keep your streak going! You're almost there.</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-4xl font-black">
                {dailyGoal.current} <span className="text-blue-200 text-xl font-bold">/ {dailyGoal.target} XP</span>
              </div>
              <p className="text-sm text-blue-100 font-bold uppercase tracking-widest mt-1">{dailyGoal.target - dailyGoal.current} XP to go</p>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-8">
            <div className="h-4 bg-white/20 rounded-full overflow-hidden border border-white/10">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(dailyGoal.current / dailyGoal.target) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              />
            </div>
            <div className="mt-3 flex justify-between text-sm font-bold text-blue-50 uppercase tracking-widest">
              <span>{Math.round((dailyGoal.current / dailyGoal.target) * 100)}% completed</span>
              <span className="flex items-center gap-1">Streak: {userStats.streak} days <Flame size={14} fill="currentColor" /></span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT COLUMN */}
        <div className="space-y-8">
          {/* Streak Calendar */}
          <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Calendar size={20} className="text-blue-500" />
                Study Streak
              </h2>
              <div className="flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-full border border-orange-100">
                <Flame size={18} fill="currentColor" />
                <span className="font-black text-sm">{userStats.streak} days</span>
              </div>
            </div>
            
            {/* Month labels */}
            <div className="flex text-[10px] font-bold text-gray-400 mb-3 ml-8 uppercase tracking-widest">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                <span key={month} className="flex-1 text-center">{month}</span>
              ))}
            </div>
            
            {/* Heatmap Grid */}
            <div className="flex gap-1.5 overflow-x-auto pb-4 no-scrollbar">
              {heatmapData.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-1.5 flex-shrink-0">
                  {week.days.map((day, dayIdx) => (
                    <motion.div
                      key={dayIdx}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (weekIdx * 7 + dayIdx) * 0.001 }}
                      className={`w-3.5 h-3.5 rounded-sm ${getHeatmapColor(day.level)} transition-all hover:ring-2 hover:ring-blue-400 cursor-help`}
                      title={`${day.date}: ${day.minutes} minutes`}
                    />
                  ))}
                </div>
              ))}
            </div>
            
            {/* Legend */}
            <div className="flex items-center gap-3 mt-6 text-[10px] font-bold text-gray-400 justify-end uppercase tracking-widest">
              <span>Less</span>
              <div className="flex gap-1.5">
                {[0, 1, 2, 3, 4].map((l) => (
                  <div key={l} className={`w-3.5 h-3.5 rounded-sm ${getHeatmapColor(l as any)}`} />
                ))}
              </div>
              <span>More</span>
            </div>
          </section>

          {/* Word Mastery Progress */}
          <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-8">Vocabulary Mastery</h2>
            
            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* Circular Progress */}
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90">
                  {/* Background circle */}
                  <circle cx="96" cy="96" r="84" fill="none" stroke="#f3f4f6" strokeWidth="16" />
                  {/* Mastered arc */}
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="84"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="16"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: 2 * Math.PI * 84 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 84 * (1 - masteredPercent) }}
                    strokeDasharray={`${2 * Math.PI * 84}`}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  {/* Learning arc (offset) */}
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="84"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="16"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: 2 * Math.PI * 84 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 84 * (1 - learningPercent) }}
                    strokeDasharray={`${2 * Math.PI * 84}`}
                    style={{ transform: `rotate(${masteredPercent * 360}deg)`, transformOrigin: 'center' }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black text-gray-900">247</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">total words</span>
                </div>
              </div>
              
              {/* Breakdown */}
              <div className="flex-1 w-full space-y-4">
                {/* Mastered */}
                <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="font-bold text-gray-700">Mastered</span>
                  </div>
                  <span className="font-black text-gray-900">156 <span className="text-gray-400 text-xs font-bold ml-1">63%</span></span>
                </div>
                
                {/* Learning */}
                <div className="flex items-center justify-between p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                    <span className="font-bold text-gray-700">Learning</span>
                  </div>
                  <span className="font-black text-gray-900">67 <span className="text-gray-400 text-xs font-bold ml-1">27%</span></span>
                </div>
                
                {/* To Learn */}
                <div className="flex items-center justify-between p-4 bg-rose-50 rounded-2xl border border-rose-100">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                    <span className="font-bold text-gray-700">To Learn</span>
                  </div>
                  <span className="font-black text-gray-900">24 <span className="text-gray-400 text-xs font-bold ml-1">10%</span></span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-8">
          {/* Study Time Analytics */}
          <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Study Time</h2>
                <p className="text-sm text-gray-500 font-medium mt-1">2.3 hours/day average</p>
              </div>
              <div className="flex p-1 bg-gray-100 rounded-2xl">
                {['Week', 'Month', 'All'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setActivePeriod(period)}
                    className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                      activePeriod === period
                        ? 'bg-white text-gray-900 shadow-md'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Bar Chart */}
            <div className="h-56 flex items-end justify-between gap-4 px-2">
              {chartData.map((day, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-3 group">
                  <div className="relative w-full flex justify-center">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.minutes / maxMinutes) * 180}px` }}
                      transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                      className="w-full max-w-[32px] bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-xl transition-all group-hover:from-blue-500 group-hover:to-blue-300 shadow-lg shadow-blue-100"
                    />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-gray-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-xl">
                      {day.minutes} min
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{day.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Skill Breakdown */}
          <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-gray-900">Skills Breakdown</h2>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Activity-based</span>
            </div>
            
            {/* Horizontal bar chart for skills */}
            <div className="space-y-6">
              {skills.map((skill, idx) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${skill.barColor.replace('bg-', 'bg-opacity-10 ')} ${skill.color}`}>
                        <skill.icon size={18} />
                      </div>
                      <span className="font-bold text-gray-700">{skill.name}</span>
                    </div>
                    <span className="font-black text-gray-900">{skill.level}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                      className={`h-full rounded-full ${skill.barColor} shadow-[0_0_10px_rgba(0,0,0,0.05)]`}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Suggestion */}
            <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                <Lightbulb size={18} />
              </div>
              <p className="text-sm text-blue-700 leading-relaxed">
                <strong>Smart Tip:</strong> Your listening is excellent! Try practicing more <strong>Speaking</strong> to balance your overall proficiency.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Achievements Section */}
      <section className="space-y-6">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-all">
            <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center text-amber-600 mb-4 group-hover:scale-110 transition-transform">
              <Star size={40} fill="currentColor" />
            </div>
            <h3 className="font-bold text-gray-900">Star Performer</h3>
            <p className="text-xs text-gray-500 mt-1">Complete 50 lessons with 100% accuracy</p>
            <div className="mt-4 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-full" />
            </div>
            <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mt-2">Earned!</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-all">
            <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
              <Trophy size={40} />
            </div>
            <h3 className="font-bold text-gray-900">Diamond Master</h3>
            <p className="text-xs text-gray-500 mt-1">Earn 50,000 total XP</p>
            <div className="mt-4 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[70%]" />
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">35,000 / 50,000 XP</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-all">
            <div className="w-20 h-20 bg-orange-100 rounded-3xl flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">
              <Flame size={40} fill="currentColor" />
            </div>
            <h3 className="font-bold text-gray-900">Streak Master</h3>
            <p className="text-xs text-gray-500 mt-1">Maintain a 30-day streak</p>
            <div className="mt-4 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 w-[40%]" />
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">12 / 30 Days</p>
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        
        <div className="space-y-2">
          {activities.map((activity, idx) => (
            <motion.div 
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer group"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${activity.iconBg} ${activity.iconColor} group-hover:scale-110 transition-transform`}>
                <activity.icon size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{activity.title}</p>
                <p className="text-sm text-gray-500 font-medium">{activity.timestamp}</p>
              </div>
              <ChevronRight size={20} className="text-gray-300 group-hover:text-gray-400 transition-colors" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Link to Full Profile */}
      <section className="flex items-center justify-center py-4">
        <button 
          onClick={() => onNavigate('profile')}
          className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-2xl text-gray-600 font-bold hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm"
        >
          <User size={20} />
          Manage Your Profile & Settings
          <ChevronRight size={18} />
        </button>
      </section>
    </div>
  );
}
