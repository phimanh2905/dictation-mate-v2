import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Timer, Trophy, ChevronRight, User, Flame, Star, TrendingUp } from 'lucide-react';

interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  hours: string;
  streak: number;
  xp: number;
  celebrationCount?: number;
}

interface CurrentUserRank {
  rank: number;
  name: string;
  avatar: string;
  hours: string;
  streak: number;
  xp: number;
  xpToNextRank: number;
}

// Mock data generation
const generateMockRankings = (count: number): LeaderboardUser[] => {
  const names = [
    'Emma Davis', 'Liam Wilson', 'Olivia Taylor', 'Noah Brown', 'Ava Miller',
    'James Anderson', 'Sophia Thomas', 'Lucas Jackson', 'Isabella White', 'Mason Harris',
    'Mia Martin', 'Ethan Thompson', 'Charlotte Garcia', 'Logan Martinez', 'Amelia Robinson',
    'Benjamin Clark', 'Harper Rodriguez', 'Jacob Lewis', 'Evelyn Lee', 'William Walker'
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `user-${i + 4}`,
    rank: i + 4,
    name: names[i % names.length] + (i >= names.length ? ` ${Math.floor(i / names.length) + 1}` : ''),
    avatar: `https://picsum.photos/seed/user${i + 4}/100/100`,
    hours: `${Math.floor(Math.random() * 30) + 5}h ${Math.floor(Math.random() * 60)}m`,
    streak: Math.floor(Math.random() * 30) + 1,
    xp: Math.floor(Math.random() * 5000) + 3000,
  })).sort((a, b) => b.xp - a.xp).map((user, i) => ({ ...user, rank: i + 4 }));
};

const topThree: LeaderboardUser[] = [
  { id: '1', rank: 1, name: 'Alex Johnson', avatar: 'https://picsum.photos/seed/alex/100/100', hours: '58h 32m', streak: 45, xp: 12500 },
  { id: '2', rank: 2, name: 'Sarah Chen', avatar: 'https://picsum.photos/seed/sarah/100/100', hours: '42h 15m', streak: 38, xp: 9800 },
  { id: '3', rank: 3, name: 'Mike Wang', avatar: 'https://picsum.photos/seed/mike/100/100', hours: '38h 45m', streak: 42, xp: 8900 },
];

const rankings = generateMockRankings(47);

const currentUser: CurrentUserRank = {
  rank: 67,
  name: 'You',
  avatar: 'https://picsum.photos/seed/me/100/100',
  hours: '12h 45m',
  streak: 14,
  xp: 3200,
  xpToNextRank: 150,
};

export default function LeaderboardPage({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 35, seconds: 42 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNum = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Weekly Leaderboard</h1>
          <p className="text-gray-500 mt-1">Compete with learners worldwide and earn exclusive rewards.</p>
        </div>
        <div className="px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm text-sm font-medium text-gray-600">
          April 7 - 13, 2026
        </div>
      </div>

      {/* Countdown Section */}
      <section className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
              <Timer size={28} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-xl">Weekly Reset</p>
              <p className="text-white/80 text-sm">New rewards unlock Monday at 00:00 UTC</p>
            </div>
          </div>
          
          {/* Countdown Timer */}
          <div className="flex items-center gap-3 font-mono text-3xl font-bold">
            <div className="flex flex-col items-center">
              <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20 min-w-[64px] text-center">
                {formatNum(timeLeft.days)}
              </div>
              <span className="text-[10px] uppercase tracking-widest mt-1 opacity-70">Days</span>
            </div>
            <span className="text-white/60 -mt-6">:</span>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20 min-w-[64px] text-center">
                {formatNum(timeLeft.hours)}
              </div>
              <span className="text-[10px] uppercase tracking-widest mt-1 opacity-70">Hrs</span>
            </div>
            <span className="text-white/60 -mt-6">:</span>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20 min-w-[64px] text-center">
                {formatNum(timeLeft.minutes)}
              </div>
              <span className="text-[10px] uppercase tracking-widest mt-1 opacity-70">Min</span>
            </div>
            <span className="text-white/60 -mt-6">:</span>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20 min-w-[64px] text-center">
                {formatNum(timeLeft.seconds)}
              </div>
              <span className="text-[10px] uppercase tracking-widest mt-1 opacity-70">Sec</span>
            </div>
          </div>
        </div>
      </section>

      {/* Rewards Preview Section */}
      <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
            <Trophy className="text-amber-600" size={20} />
          </div>
          Weekly Rewards
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 1st Place */}
          <div className="relative p-6 bg-amber-50 rounded-2xl border border-amber-100 flex flex-col items-center text-center group hover:shadow-md transition-all">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🥇</div>
            <p className="font-bold text-xl text-gray-900">1st Place</p>
            <div className="mt-2 space-y-1">
              <p className="text-amber-700 font-bold">+500 XP Bonus</p>
              <p className="text-sm text-amber-600/80 font-medium">Exclusive Gold Frame</p>
            </div>
            <div className="mt-4 w-full h-1.5 bg-amber-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-full"></div>
            </div>
          </div>
          
          {/* 2nd Place */}
          <div className="relative p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center text-center group hover:shadow-md transition-all">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🥈</div>
            <p className="font-bold text-xl text-gray-900">2nd Place</p>
            <div className="mt-2 space-y-1">
              <p className="text-slate-700 font-bold">+300 XP Bonus</p>
              <p className="text-sm text-slate-600/80 font-medium">Silver Profile Frame</p>
            </div>
            <div className="mt-4 w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-slate-400 w-full"></div>
            </div>
          </div>
          
          {/* 3rd Place */}
          <div className="relative p-6 bg-orange-50 rounded-2xl border border-orange-100 flex flex-col items-center text-center group hover:shadow-md transition-all">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🥉</div>
            <p className="font-bold text-xl text-gray-900">3rd Place</p>
            <div className="mt-2 space-y-1">
              <p className="text-orange-700 font-bold">+200 XP Bonus</p>
              <p className="text-sm text-orange-600/80 font-medium">Bronze Profile Frame</p>
            </div>
            <div className="mt-4 w-full h-1.5 bg-orange-200 rounded-full overflow-hidden">
              <div className="h-full bg-orange-400 w-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Podium Section */}
      <section className="py-12 px-4">
        <div className="flex items-end justify-center gap-4 md:gap-12">
          {/* 2nd Place - Left */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center pb-4"
          >
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-white ring-4 ring-slate-300 p-1 shadow-lg">
                <img 
                  src={topThree[1].avatar} 
                  alt={topThree[1].name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 bg-slate-100 border-2 border-slate-300 rounded-full flex items-center justify-center text-xl shadow-md">
                🥈
              </div>
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-900 text-lg">{topThree[1].name}</p>
              <p className="text-sm text-gray-500 font-medium">{topThree[1].hours}</p>
              <div className="mt-2 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full border border-slate-200">
                {topThree[1].xp.toLocaleString()} XP
              </div>
            </div>
          </motion.div>
          
          {/* 1st Place - Center (Tallest) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex flex-col items-center -mt-12"
          >
            <div className="relative mb-6">
              {/* Crown */}
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl z-10 drop-shadow-md"
              >
                👑
              </motion.div>
              <div className="w-36 h-36 rounded-full bg-white ring-4 ring-amber-400 ring-offset-4 p-1 shadow-2xl">
                <img 
                  src={topThree[0].avatar} 
                  alt={topThree[0].name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-2xl shadow-xl border-4 border-white">
                🥇
              </div>
            </div>
            <div className="text-center">
              <p className="font-bold text-2xl text-gray-900 tracking-tight">{topThree[0].name}</p>
              <p className="text-gray-500 font-medium">{topThree[0].hours}</p>
              <div className="mt-3 px-4 py-1.5 bg-amber-100 text-amber-700 text-sm font-bold rounded-full border border-amber-200 shadow-sm">
                {topThree[0].xp.toLocaleString()} XP
              </div>
            </div>
          </motion.div>
          
          {/* 3rd Place - Right */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center pb-4"
          >
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-white ring-4 ring-orange-300 p-1 shadow-lg">
                <img 
                  src={topThree[2].avatar} 
                  alt={topThree[2].name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 bg-orange-50 border-2 border-orange-200 rounded-full flex items-center justify-center text-xl shadow-md">
                🥉
              </div>
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-900 text-lg">{topThree[2].name}</p>
              <p className="text-sm text-gray-500 font-medium">{topThree[2].hours}</p>
              <div className="mt-2 px-3 py-1 bg-orange-50 text-orange-700 text-xs font-bold rounded-full border border-orange-200">
                {topThree[2].xp.toLocaleString()} XP
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rankings List */}
      <section className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-4 p-5 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <span className="w-12 text-center">Rank</span>
          <span className="flex-1">Learner</span>
          <span className="w-32 text-right hidden md:block">Study Time</span>
          <span className="w-28 text-right">XP Earned</span>
        </div>
        
        {/* List Items */}
        <div className="divide-y divide-gray-50">
          {rankings.map((user, idx) => (
            <motion.div 
              key={user.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={`flex items-center gap-4 p-5 hover:bg-blue-50/50 transition-colors group cursor-pointer ${
                idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
              }`}
            >
              {/* Rank */}
              <span className="w-12 text-center font-bold text-gray-400 group-hover:text-blue-500 transition-colors">
                #{user.rank}
              </span>
              
              {/* User */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="relative">
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-sm"
                  />
                  {user.streak > 20 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white">
                      <Flame size={10} className="text-white fill-current" />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{user.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded uppercase tracking-wider">Level {Math.floor(user.xp / 1000)}</span>
                    <p className="text-xs text-gray-400 md:hidden flex items-center gap-1">
                      <TrendingUp size={12} /> {user.hours}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Stats - Hidden on mobile */}
              <div className="w-32 text-right hidden md:block">
                <p className="font-bold text-gray-700">{user.hours}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center justify-end gap-1">
                  <Flame size={12} className="text-orange-500" /> {user.streak} day streak
                </p>
              </div>
              
              {/* XP */}
              <div className="w-28 text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <span className="font-bold text-gray-900 text-lg">{user.xp.toLocaleString()}</span>
                  <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    <Star size={12} fill="currentColor" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* My Rank Card */}
      <div className="sticky bottom-4 mx-auto w-full max-w-4xl z-40">
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="bg-blue-600 border-2 border-blue-400 rounded-3xl p-5 shadow-2xl text-white flex flex-col sm:flex-row items-center gap-6"
        >
          <div className="flex items-center gap-6 flex-1 w-full">
            {/* Rank */}
            <div className="text-center min-w-[60px]">
              <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest">Rank</p>
              <p className="text-3xl font-black">#{currentUser.rank}</p>
            </div>
            
            {/* Avatar */}
            <div className="relative">
              <img 
                src={currentUser.avatar} 
                className="w-16 h-16 rounded-2xl border-4 border-blue-500 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-blue-600">
                <CheckCircleIcon />
              </div>
            </div>
            
            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-black text-xl">You</p>
                <span className="px-2 py-0.5 bg-blue-500 rounded text-[10px] font-bold uppercase tracking-wider">Pro Learner</span>
              </div>
              <p className="text-blue-100 text-sm font-medium mt-1">
                {currentUser.hours} studied • {currentUser.xp.toLocaleString()} XP earned
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-2 bg-blue-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  />
                </div>
                <p className="text-[10px] font-bold text-blue-200 uppercase tracking-wider">
                  {currentUser.xpToNextRank} XP to rank up
                </p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => onNavigate('practice')}
            className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl active:scale-95"
          >
            Boost Rank
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}
