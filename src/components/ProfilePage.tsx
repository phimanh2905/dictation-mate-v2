import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  Target, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Edit2,
  BarChart3 as Chart,
  ArrowRight,
  Flame,
  X,
  Plus,
  Zap
} from 'lucide-react';

export default function ProfilePage({ onNavigate }: { onNavigate: (page: any) => void }) {
  const { t } = useTranslation();
  const [targetLevel, setTargetLevel] = useState('C1 Advanced');
  const [dailyGoal, setDailyGoal] = useState('30 minutes / day');
  const [interests, setInterests] = useState(['Business', 'Tech', 'Daily Life', 'Science']);
  const [isEditingLevel, setIsEditingLevel] = useState(false);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [newInterest, setNewInterest] = useState('');

  const levels = ['A1 Beginner', 'A2 Elementary', 'B1 Intermediate', 'B2 Upper-Intermediate', 'C1 Advanced', 'C2 Proficiency'];
  const goals = ['15 minutes / day', '30 minutes / day', '45 minutes / day', '60 minutes / day', '90 minutes / day'];

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-violet-600 rounded-3xl flex items-center justify-center text-white text-4xl font-bold shadow-xl">
            PM
          </div>
          <button className="absolute -bottom-2 -right-2 p-2 bg-white border border-gray-200 rounded-xl text-gray-600 shadow-lg hover:bg-gray-50 transition-all">
            <Edit2 size={16} />
          </button>
        </div>

        <div className="flex-1 text-center md:text-left space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Phạm Anh</h1>
          <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2">
            <Mail size={16} />
            phmanh_m2@gmail.com
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full border border-blue-100 flex items-center gap-1.5">
              <Target size={14} />
              Level: B2 🌳
            </span>
            <span className="px-3 py-1 bg-orange-50 text-orange-600 text-xs font-bold rounded-full border border-orange-100 flex items-center gap-1.5">
              <Calendar size={14} />
              Joined Jan 2025
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-auto">
          <button 
            onClick={() => onNavigate('pricing')}
            className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all text-center flex items-center justify-center gap-2"
          >
            <Zap size={18} fill="currentColor" />
            Upgrade to Premium
          </button>
          <button className="px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-2xl font-bold hover:bg-gray-50 transition-all text-center">
            Edit Profile
          </button>
        </div>

        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
      </section>

      {/* Plan & Progress Card */}
      <section className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner">
              <Zap size={32} className="text-amber-400" fill="currentColor" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold text-blue-200 uppercase tracking-widest">{t('pricing.current')}</p>
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-tighter">Free</span>
              </div>
              <h3 className="font-black text-3xl mt-1">Dictation Mate Free</h3>
              <p className="text-blue-100 text-sm mt-1 opacity-80">
                47 hours studied • 12.4k XP • 12 day streak
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => onNavigate('pricing')}
              className="px-6 py-3 bg-amber-400 text-blue-900 rounded-2xl font-bold text-sm hover:bg-amber-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
            >
              <Zap size={18} fill="currentColor" />
              {t('pricing.upgrade')}
            </button>
            <button 
              onClick={() => onNavigate('statistics')}
              className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-2xl font-bold text-sm border border-white/20 hover:bg-white/30 transition-all flex items-center justify-center gap-2"
            >
              {t('home.viewProgress')}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
        
        {/* Mini stat pills */}
        <div className="relative z-10 flex flex-wrap gap-3 mt-6 pt-6 border-t border-white/20">
          <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-bold border border-white/10 flex items-center gap-2">
            <Flame size={14} className="text-orange-400" fill="currentColor" />
            12 Day Streak
          </span>
          <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-bold border border-white/10 flex items-center gap-2">
            <Award size={14} className="text-yellow-400" />
            12.4k XP
          </span>
          <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-bold border border-white/10 flex items-center gap-2">
            <Target size={14} className="text-blue-400" />
            B2 Level
          </span>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Learning Preferences */}
        <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Target className="text-blue-600" />
            Learning Preferences
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Target Level</div>
                  {isEditingLevel ? (
                    <select 
                      value={targetLevel}
                      onChange={(e) => {
                        setTargetLevel(e.target.value);
                        setIsEditingLevel(false);
                      }}
                      className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                      onBlur={() => setIsEditingLevel(false)}
                    >
                      {levels.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  ) : (
                    <div className="font-bold text-gray-900">{targetLevel}</div>
                  )}
                </div>
                <button 
                  onClick={() => setIsEditingLevel(!isEditingLevel)}
                  className="text-blue-600 text-sm font-bold hover:underline"
                >
                  {isEditingLevel ? 'Cancel' : 'Change'}
                </button>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Daily Goal</div>
                  {isEditingGoal ? (
                    <select 
                      value={dailyGoal}
                      onChange={(e) => {
                        setDailyGoal(e.target.value);
                        setIsEditingGoal(false);
                      }}
                      className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                      onBlur={() => setIsEditingGoal(false)}
                    >
                      {goals.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  ) : (
                    <div className="font-bold text-gray-900">{dailyGoal}</div>
                  )}
                </div>
                <button 
                  onClick={() => setIsEditingGoal(!isEditingGoal)}
                  className="text-blue-600 text-sm font-bold hover:underline"
                >
                  {isEditingGoal ? 'Cancel' : 'Change'}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Interests</div>
              <div className="flex flex-wrap gap-2">
                {interests.map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 flex items-center gap-2 group">
                    {tag}
                    <button 
                      onClick={() => removeInterest(tag)}
                      className="text-gray-400 hover:text-rose-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
                <div className="flex items-center gap-2">
                  <input 
                    type="text"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addInterest()}
                    placeholder="Add interest..."
                    className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
                  />
                  <button 
                    onClick={addInterest}
                    className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Settings & Account */}
        <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Bell className="text-blue-600" />
            Account Settings
          </h2>

          <div className="space-y-2">
            {[
              { label: 'Notifications', icon: Bell, color: 'text-blue-500' },
              { label: 'Privacy & Security', icon: Shield, color: 'text-emerald-500' },
              { label: 'Help & Support', icon: HelpCircle, color: 'text-amber-500' },
              { label: 'Logout', icon: LogOut, color: 'text-rose-500', danger: true },
            ].map((item) => (
              <button 
                key={item.label}
                className="w-full p-4 flex items-center justify-between rounded-2xl hover:bg-gray-50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                    <item.icon size={20} />
                  </div>
                  <span className={`font-bold ${item.danger ? 'text-rose-600' : 'text-gray-700'}`}>{item.label}</span>
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-gray-900" />
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
