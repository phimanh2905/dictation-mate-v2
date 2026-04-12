import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Flame, 
  Bell, 
  Sun, 
  Moon, 
  User,
  Search as SearchIcon
} from 'lucide-react';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  onNavigate: (page: any) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync with system preference or local storage if needed
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 px-4 md:px-8 h-16 flex items-center justify-between transition-colors">
      {/* Left: Search Input */}
      <div className="flex-1 max-w-md relative group">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <SearchIcon size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
        </div>
        <input
          type="text"
          placeholder={t('nav.explore') + '...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-700 border focus:border-blue-500 rounded-2xl py-2 pl-10 pr-4 text-sm font-medium transition-all outline-none dark:text-white"
        />
      </div>

      {/* Right: Badges & Icons */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Streak Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30 rounded-full">
          <Flame size={16} className="text-orange-500" fill="currentColor" />
          <span className="text-xs font-bold text-orange-700 dark:text-orange-400">12 days</span>
        </div>

        {/* Language Badge (Using adapted LanguageToggle style) */}
        <div className="hidden md:block">
          <LanguageToggle />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-all"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-all">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>

        {/* User Avatar */}
        <button 
          onClick={() => onNavigate('profile')}
          className="flex items-center gap-2 p-1 pl-1 pr-3 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-all border border-transparent hover:border-gray-200 dark:hover:border-slate-700"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
            PM
          </div>
          <span className="hidden lg:block text-xs font-bold text-gray-700 dark:text-gray-300">Phạm Anh</span>
        </button>
      </div>
    </header>
  );
}
