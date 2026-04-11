import React from 'react';
import { 
  Home, 
  Search, 
  PlusCircle, 
  BookOpen, 
  User 
} from 'lucide-react';
import { Page } from '../types';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: Page;
}

const mobileNavItems: NavItem[] = [
  { icon: Home, label: 'Home', path: 'home' },
  { icon: Search, label: 'Explore', path: 'explore' },
  { icon: PlusCircle, label: 'Add', path: 'create' },
  { icon: BookOpen, label: 'Vocab', path: 'vocab' },
  { icon: User, label: 'Profile', path: 'profile' },
];

interface BottomNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onAddVideo: () => void;
  className?: string;
}

export default function BottomNav({ currentPage, onNavigate, onAddVideo, className = '' }: BottomNavProps) {
  return (
    <nav className={`bg-white border-t border-gray-200 h-16 flex items-center justify-around px-4 pb-safe ${className}`}>
      {mobileNavItems.map((item) => {
        const isActive = currentPage === item.path;
        const isAdd = item.path === 'create';

        if (isAdd) {
          return (
            <button
              key={item.path}
              onClick={onAddVideo}
              className="relative -top-4 flex flex-col items-center"
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
                isActive ? 'bg-blue-600' : 'bg-emerald-600'
              }`}>
                <item.icon size={28} className="text-white" />
              </div>
              <span className={`text-[10px] font-bold mt-1 ${isActive ? 'text-blue-600' : 'text-emerald-600'}`}>
                {item.label}
              </span>
            </button>
          );
        }

        return (
          <button
            key={item.path}
            onClick={() => onNavigate(item.path)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <item.icon size={22} />
            <span className="text-[10px] font-bold">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
