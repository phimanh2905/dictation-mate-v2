import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  Search, 
  PlusCircle, 
  BookOpen, 
  Timer, 
  Trophy, 
  BarChart3, 
  Settings,
  User,
  Library,
  Flame,
  Zap
} from 'lucide-react';
import { Page } from '../types';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: Page;
  badge?: string | number;
}

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onAddVideo: () => void;
  className?: string;
}

export default function Sidebar({ currentPage, onNavigate, onAddVideo, className = '' }: SidebarProps) {
  const { t } = useTranslation();

  const mainNavItems: NavItem[] = [
    { icon: Home, label: t('nav.home'), path: 'home' },
    { icon: Search, label: t('nav.explore'), path: 'explore' },
    { icon: Library, label: t('nav.library'), path: 'library' },
  ];

  const createNavItems: NavItem[] = [
    { icon: PlusCircle, label: t('nav.create'), path: 'create', badge: 'NEW' },
  ];

  const practiceNavItems: NavItem[] = [
    { icon: BookOpen, label: t('nav.vocab'), path: 'vocab' },
    { icon: Timer, label: t('nav.studyRoom'), path: 'study-room' },
  ];

  const socialNavItems: NavItem[] = [
    { icon: Trophy, label: t('nav.leaderboard'), path: 'leaderboard' },
  ];

  const personalNavItems: NavItem[] = [
    { icon: BarChart3, label: t('nav.statistics'), path: 'statistics' },
    { icon: Settings, label: t('nav.settings'), path: 'settings' },
    { icon: Zap, label: t('nav.upgrade'), path: 'pricing', badge: 'PRO' },
  ];

  const renderNavItem = (item: NavItem) => {
    const isActive = currentPage === item.path;
    return (
      <button
        key={item.path}
        onClick={() => {
          if (item.path === 'create') {
            onAddVideo();
          } else {
            onNavigate(item.path);
          }
        }}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 group ${
          isActive 
            ? 'bg-blue-600/10 text-blue-600 font-semibold' 
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        <div className="flex items-center gap-3">
          <item.icon size={20} className={isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'} />
          <span className="text-sm">{item.label}</span>
        </div>
        {item.badge && (
          <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-600 text-[10px] font-bold rounded uppercase">
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside className={`bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto no-scrollbar ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">D</div>
            <span className="text-xl font-bold tracking-tight text-gray-900">Dictation Mate</span>
          </div>
        </div>

        {/* Streak Card */}
        <section className="mb-8 p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <Flame size={20} className="text-orange-500" fill="currentColor" />
            </div>
            <div>
              <p className="font-bold text-orange-700">12 days</p>
              <p className="text-[10px] text-orange-500 font-medium">Keep it up! 🔥</p>
            </div>
          </div>
          <div className="mt-3 h-1.5 bg-orange-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-400 to-amber-400 w-3/5 rounded-full" />
          </div>
          <p className="text-[10px] text-orange-400 mt-1.5 font-medium">18 days to 30-day badge</p>
        </section>

        <div className="space-y-8">
          <div>
            <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Main</p>
            <div className="space-y-1">
              {mainNavItems.map(renderNavItem)}
            </div>
          </div>

          <div>
            <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Create</p>
            <div className="space-y-1">
              {createNavItems.map(renderNavItem)}
            </div>
          </div>

          <div>
            <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Practice</p>
            <div className="space-y-1">
              {practiceNavItems.map(renderNavItem)}
            </div>
          </div>

          <div>
            <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Social</p>
            <div className="space-y-1">
              {socialNavItems.map(renderNavItem)}
            </div>
          </div>

          <div>
            <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Personal</p>
            <div className="space-y-1">
              {personalNavItems.map(renderNavItem)}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto p-6 border-t border-gray-100 space-y-4">
        {/* Current Plan Badge */}
        <div className="flex items-center justify-between px-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('pricing.current')}</span>
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-full">
            FREE
          </span>
        </div>
        
        {/* Upgrade Button */}
        <button 
          onClick={() => onNavigate('pricing')}
          className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-orange-100 hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Zap size={16} fill="currentColor" />
          {t('pricing.upgrade')}
        </button>

        <button 
          onClick={() => onNavigate('profile')}
          className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all ${
            currentPage === 'profile' ? 'bg-gray-100' : 'hover:bg-gray-50'
          }`}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold">
            PM
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-gray-900">Phạm Anh</p>
            <p className="text-[10px] text-gray-500">B2 Learner</p>
          </div>
        </button>
      </div>
    </aside>
  );
}
