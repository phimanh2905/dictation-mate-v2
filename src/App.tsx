/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './i18n'; // Initialize i18n
import { Page } from './types';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import HomePage from './components/HomePage';
import ExplorePage from './components/ExplorePage';
import StudyRoom from './components/StudyRoom';
import PracticePage from './components/PracticePage';
import MasteryLab from './components/MasteryLab';
import VocabPage from './components/VocabPage';
import ProfilePage from './components/ProfilePage';
import AddVideoPage from './components/AddVideoPage';
import MyVideosPage from './components/MyVideosPage';
import AddVideoModal from './components/create/AddVideoModal';
import LeaderboardPage from './components/LeaderboardPage';
import StatisticsPage from './components/StatisticsPage';
import PricingPage from './components/PricingPage';
import Header from './components/Header';
import OnboardingWizard from './components/onboarding/OnboardingWizard';
import LoginPage from './components/auth/LoginPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAddVideoModalOpen, setIsAddVideoModalOpen] = useState(false);

  const handleAddVideo = () => {
    if (window.innerWidth >= 1024) {
      setIsAddVideoModalOpen(true);
    } else {
      setCurrentPage('create');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={setCurrentPage} onAddVideo={handleAddVideo} />;
      case 'explore': return <ExplorePage onNavigate={setCurrentPage} />;
      case 'study-room': return <StudyRoom onNavigate={setCurrentPage} />;
      case 'practice': return <PracticePage onNavigate={setCurrentPage} />;
      case 'mastery': return <MasteryLab onNavigate={setCurrentPage} />;
      case 'vocab': return <VocabPage onNavigate={setCurrentPage} />;
      case 'profile': return <ProfilePage onNavigate={setCurrentPage} />;
      case 'create': return <AddVideoPage onNavigate={setCurrentPage} />;
      case 'library': return <MyVideosPage onNavigate={setCurrentPage} onAddVideo={handleAddVideo} />;
      case 'leaderboard': return <LeaderboardPage onNavigate={setCurrentPage} />;
      case 'statistics': return <StatisticsPage onNavigate={setCurrentPage} />;
      case 'pricing': return <PricingPage onNavigate={setCurrentPage} />;
      case 'onboarding': return <OnboardingWizard onComplete={() => setCurrentPage('home')} />;
      case 'login': return <LoginPage onLogin={() => setCurrentPage('onboarding')} />;
      case 'settings': return <PlaceholderPage title="Settings" icon="⚙️" />;
      default: return <HomePage onNavigate={setCurrentPage} onAddVideo={handleAddVideo} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        onAddVideo={handleAddVideo}
        className="hidden lg:flex flex-col" 
      />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onNavigate={setCurrentPage} />
        <div className="flex-1 overflow-y-auto no-scrollbar pb-20 lg:pb-8">
          <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
      
      {/* Mobile Bottom Nav */}
      <BottomNav 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        onAddVideo={handleAddVideo}
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50" 
      />

      {/* Global Modal */}
      <AddVideoModal 
        isOpen={isAddVideoModalOpen} 
        onClose={() => setIsAddVideoModalOpen(false)}
        onSuccess={() => {
          setIsAddVideoModalOpen(false);
          setCurrentPage('practice');
        }}
      />
    </div>
  );
}

function PlaceholderPage({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <div className="text-6xl">{icon}</div>
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-500 max-w-md">
        This page is coming soon. We're working hard to bring you the best {title.toLowerCase()} experience!
      </p>
    </div>
  );
}

