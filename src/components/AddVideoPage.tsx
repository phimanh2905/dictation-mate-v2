import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, HelpCircle } from 'lucide-react';
import { Page } from '../types';
import AddVideoForm from './create/AddVideoForm';

interface AddVideoPageProps {
  onNavigate: (page: Page) => void;
}

export default function AddVideoPage({ onNavigate }: AddVideoPageProps) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Video</h1>
            <p className="text-sm text-gray-500">Create a new lesson from any YouTube video</p>
          </div>
        </div>
        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
          <HelpCircle size={24} />
        </button>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <AddVideoForm 
          onSuccess={() => onNavigate('practice')} 
          onCancel={() => onNavigate('home')}
        />
      </div>

      {/* Tips Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
          <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Tip #1</h4>
          <p className="text-xs text-blue-800 leading-relaxed">Choose videos with clear audio and subtitles for the best practice experience.</p>
        </div>
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
          <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Tip #2</h4>
          <p className="text-xs text-emerald-800 leading-relaxed">Short videos (3-5 mins) are better for focused dictation sessions.</p>
        </div>
        <div className="p-4 bg-violet-50 rounded-2xl border border-violet-100">
          <h4 className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-1">Tip #3</h4>
          <p className="text-xs text-violet-800 leading-relaxed">You can organize your lessons into folders for different learning goals.</p>
        </div>
      </div>
    </div>
  );
}
