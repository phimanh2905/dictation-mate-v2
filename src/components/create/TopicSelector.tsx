import React from 'react';
import { X, Plus } from 'lucide-react';
import { TOPICS } from '../../constants';

interface TopicSelectorProps {
  selected: string[];
  onChange: (topics: string[]) => void;
}

const popularTags = ['IELTS', 'TOEIC', 'Business', 'Movies', 'Daily', 'Science', 'Songs', 'Travel', 'Technology'];

export default function TopicSelector({ selected, onChange }: TopicSelectorProps) {
  const toggleTopic = (topic: string) => {
    if (selected.includes(topic)) {
      onChange(selected.filter(t => t !== topic));
    } else {
      onChange([...selected, topic]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-700">Chủ đề / Tags</label>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          {selected.length} Selected
        </span>
      </div>

      {/* Selected Chips */}
      <div className="flex flex-wrap gap-2 min-h-[40px] p-2 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
        {selected.length === 0 ? (
          <p className="text-xs text-gray-400 italic flex items-center gap-1 px-2 py-1">
            Chưa có chủ đề nào được chọn
          </p>
        ) : (
          selected.map((topic) => (
            <button
              key={topic}
              onClick={() => toggleTopic(topic)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full shadow-sm hover:bg-blue-700 transition-colors"
            >
              {topic}
              <X size={12} />
            </button>
          ))
        )}
      </div>

      {/* Quick Add Section */}
      <div className="space-y-2">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gợi ý phổ biến</p>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => {
            const isSelected = selected.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTopic(tag)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-blue-100 text-blue-600 border-blue-200 cursor-default'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                {!isSelected && <Plus size={12} />}
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
