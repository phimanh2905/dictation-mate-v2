import React from 'react';
import { Page } from '../types';
import { MOCK_VIDEOS } from '../constants';
import PracticeLayout from './practice/PracticeLayout';

interface PracticePageProps {
  onNavigate: (page: Page) => void;
}

export default function PracticePage({ onNavigate }: PracticePageProps) {
  const video = MOCK_VIDEOS[0];

  // For the purpose of this task, we'll focus on the new Desktop UI
  // The original PracticePage had complex logic for mobile/desktop resizing
  // but the user's request is specifically for a modern 2-column Desktop UI.
  
  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-hidden">
      <PracticeLayout 
        video={video} 
        onBack={() => onNavigate('home')} 
      />
    </div>
  );
}

