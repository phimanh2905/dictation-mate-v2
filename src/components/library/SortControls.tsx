import React from 'react';
import { ChevronDown, LayoutGrid, List } from 'lucide-react';

interface SortControlsProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

const sortOptions = [
  { id: 'newest', label: 'Mới nhất' },
  { id: 'oldest', label: 'Cũ nhất' },
  { id: 'name-asc', label: 'Tên A-Z' },
  { id: 'name-desc', label: 'Tên Z-A' },
  { id: 'progress', label: 'Tiến độ cao nhất' },
  { id: 'duration', label: 'Thời lượng dài nhất' },
];

export default function SortControls({ 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange 
}: SortControlsProps) {
  const currentSort = sortOptions.find(o => o.id === sortBy) || sortOptions[0];

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 font-medium">Sắp xếp:</span>
        <div className="relative group">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:border-blue-300 transition-all">
            {currentSort.label}
            <ChevronDown size={16} className="text-gray-400" />
          </button>
          
          <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden">
            {sortOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onSortChange(option.id)}
                className={`w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors ${
                  sortBy === option.id ? 'text-blue-600 bg-blue-50/50' : 'text-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
        <button
          onClick={() => onViewModeChange('grid')}
          className={`p-1.5 rounded-md transition-all ${
            viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <LayoutGrid size={18} />
        </button>
        <button
          onClick={() => onViewModeChange('list')}
          className={`p-1.5 rounded-md transition-all ${
            viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <List size={18} />
        </button>
      </div>
    </div>
  );
}
