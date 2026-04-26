import React, { useState } from 'react';
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
  Zap,
  Rocket,
  ChevronLeft,
  ChevronRight
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // The sidebar expands if it's not manually collapsed, OR if it's hovered while collapsed
  const isExpanded = !isCollapsed || isHovered;

  const mainNavItems: NavItem[] = [
    { icon: Home, label: t('nav.home'), path: 'home' },
    { icon: Search, label: t('nav.explore'), path: 'explore' },
    { icon: Library, label: t('nav.library'), path: 'library' },
    { icon: Rocket, label: 'Onboarding', path: 'onboarding', badge: 'DEMO' },
    { icon: User, label: 'Login', path: 'login', badge: 'DEMO' },
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
        } ${!isExpanded ? 'justify-center px-0' : ''}`}
      >
        <div className={`flex items-center ${isExpanded ? 'gap-3' : 'gap-0'}`}>
          <item.icon size={20} className={isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'} />
          <span className={`text-sm whitespace-nowrap transition-all duration-300 overflow-hidden ${isExpanded ? 'w-auto opacity-100' : 'w-0 opacity-0'}`}>
            {item.label}
          </span>
        </div>
        {item.badge && isExpanded && (
          <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-600 text-[10px] font-bold rounded uppercase">
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside 
      className={`bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto no-scrollbar transition-all duration-300 ease-in-out z-50 ${
        isExpanded ? 'w-64' : 'w-20'
      } ${className}`}
      onMouseEnter={() => isCollapsed && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex flex-col h-full bg-white transition-all duration-300 ${isExpanded ? 'p-6' : 'p-4'}`}>
        <div className={`flex items-center mb-8 transition-all duration-300 ${isExpanded ? 'justify-between flex-row' : 'justify-center flex-col gap-4'}`}>
          <div 
            className="flex items-center gap-2 cursor-pointer transition-all duration-300 transform active:scale-95" 
            onClick={() => onNavigate('home')}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200 shrink-0">D</div>
            <span className={`text-xl font-bold tracking-tight text-gray-900 overflow-hidden transition-all duration-300 ${isExpanded ? 'w-auto ml-1 opacity-100' : 'w-0 opacity-0 invisible h-0'}`}>
              Dictation Mate
            </span>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsCollapsed(!isCollapsed);
            }}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-all z-50 flex items-center justify-center bg-gray-100 border border-gray-200 shadow-sm hover:scale-105 active:scale-95"
            title={isCollapsed ? "Mở rộng" : "Thu gọn"}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Streak Card */}
        <section className={`mb-8 p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100 transition-all duration-300 overflow-hidden ${isExpanded ? 'h-auto opacity-100' : 'h-0 opacity-0 invisible mb-0 p-0'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
              <Flame size={20} className="text-orange-500" fill="currentColor" />
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-orange-700 whitespace-nowrap">12 days</p>
              <p className="text-[10px] text-orange-500 font-medium whitespace-nowrap">Keep it up! 🔥</p>
            </div>
          </div>
          <div className="mt-3 h-1.5 bg-orange-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-400 to-amber-400 w-3/5 rounded-full" />
          </div>
          <p className="text-[10px] text-orange-400 mt-1.5 font-medium whitespace-nowrap">18 days to 30-day badge</p>
        </section>

        {/* Streak Icon when collapsed */}
        {!isExpanded && (
           <div className="mb-8 flex flex-col items-center gap-1 group relative">
             <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 hover:bg-orange-200 transition-colors cursor-pointer">
                <Flame size={20} fill="currentColor" />
             </div>
             <span className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-[60]">
               12 Days Streak
             </span>
           </div>
        )}

        <div className="space-y-8 flex-1">
          <div>
            <p className={`px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 invisible h-0 mb-0 px-0'}`}>Main</p>
            <div className="space-y-1">
              {mainNavItems.map(renderNavItem)}
            </div>
          </div>

          <div>
            <p className={`px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 invisible h-0 mb-0 px-0'}`}>Create</p>
            <div className="space-y-1">
              {createNavItems.map(renderNavItem)}
            </div>
          </div>

          <div>
            <p className={`px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 invisible h-0 mb-0 px-0'}`}>Practice</p>
            <div className="space-y-1">
              {practiceNavItems.map(renderNavItem)}
            </div>
          </div>

          <div>
            <p className={`px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 invisible h-0 mb-0 px-0'}`}>Social</p>
            <div className="space-y-1">
              {socialNavItems.map(renderNavItem)}
            </div>
          </div>

          <div>
            <p className={`px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 invisible h-0 mb-0 px-0'}`}>Personal</p>
            <div className="space-y-1">
              {personalNavItems.map(renderNavItem)}
            </div>
          </div>
        </div>

        <div className={`mt-auto pt-6 border-t border-gray-100 space-y-4 ${isExpanded ? 'px-0' : 'px-0 flex flex-col items-center'}`}>
          {/* Current Plan Badge */}
          <div className={`flex items-center justify-between px-2 w-full transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 invisible h-0'}`}>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('pricing.current')}</span>
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-full">
              FREE
            </span>
          </div>
          
          {/* Upgrade Button */}
          <button 
            onClick={() => onNavigate('pricing')}
            className={`transition-all duration-300 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold shadow-lg shadow-orange-100 hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 ${
              isExpanded ? 'w-full py-2.5 px-4 rounded-xl text-sm' : 'w-10 h-10 rounded-xl p-0'
            }`}
          >
            <Zap size={16} fill="currentColor" />
            <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isExpanded ? 'w-auto opacity-100 ml-1' : 'w-0 opacity-0'}`}>
              {t('pricing.upgrade')}
            </span>
          </button>

          <button 
            onClick={() => onNavigate('profile')}
            className={`flex items-center transition-all transition-all duration-300 hover:bg-gray-50 group relative ${
              isExpanded ? 'w-full gap-3 p-2 rounded-xl' : 'w-10 h-10 p-0 rounded-xl justify-center'
            } ${currentPage === 'profile' ? 'bg-gray-100' : ''}`}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold shrink-0">
              PM
            </div>
            <div className={`text-left overflow-hidden transition-all duration-300 ${isExpanded ? 'w-auto opacity-100' : 'w-0 opacity-0'}`}>
              <p className="text-sm font-bold text-gray-900 whitespace-nowrap">Phạm Anh</p>
              <p className="text-[10px] text-gray-500 whitespace-nowrap">B2 Learner</p>
            </div>
            {!isExpanded && (
              <span className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-[60]">
                Profile: Phạm Anh
              </span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
