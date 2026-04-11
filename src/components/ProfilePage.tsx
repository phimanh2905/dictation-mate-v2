import { motion } from 'motion/react';
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
  Flame
} from 'lucide-react';

export default function ProfilePage({ onNavigate }: { onNavigate: (page: any) => void }) {
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
          <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all text-center">
            Upgrade to Premium
          </button>
          <button className="px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-2xl font-bold hover:bg-gray-50 transition-all text-center">
            Edit Profile
          </button>
        </div>

        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
      </section>

      {/* Dashboard Preview Card - Shows quick stats + link */}
      <section className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
              <Chart size={28} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-xl">Your Progress</h3>
              <p className="text-blue-100 text-sm mt-1">
                47 hours studied • 12.4k XP • 12 day streak
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => onNavigate('statistics')}
            className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-2xl font-bold text-sm border border-white/20 hover:bg-white/30 transition-all flex items-center gap-2"
          >
            View Full Dashboard
            <ArrowRight size={18} />
          </button>
        </div>
        
        {/* Mini stat pills */}
        <div className="relative z-10 flex flex-wrap gap-3 mt-6 pt-6 border-t border-white/20">
          <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-bold border border-white/10">
            🔥 12 Day Streak
          </span>
          <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-bold border border-white/10">
            ⭐ 12.4k XP
          </span>
          <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-bold border border-white/10">
            🎯 B2 Level
          </span>
          <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-bold border border-white/10">
            📚 247 Words
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
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Target Level</div>
                <div className="font-bold text-gray-900">C1 Advanced</div>
              </div>
              <button className="text-blue-600 text-sm font-bold hover:underline">Change</button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Daily Goal</div>
                <div className="font-bold text-gray-900">30 minutes / day</div>
              </div>
              <button className="text-blue-600 text-sm font-bold hover:underline">Change</button>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Interests</div>
              <div className="flex flex-wrap gap-2">
                {['Business', 'Tech', 'Daily Life', 'Science'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600">
                    {tag}
                  </span>
                ))}
                <button className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold">+ Add</button>
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
