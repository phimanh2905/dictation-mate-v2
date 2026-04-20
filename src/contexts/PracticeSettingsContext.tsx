import React, { createContext, useContext, useState, useEffect } from 'react';
import { PracticeSettings, ReplayCount, KeyboardShortcuts } from '../types';

interface PracticeSettingsContextType extends PracticeSettings {
  setReplayCount: (count: ReplayCount) => void;
  setHideVideo: (hide: boolean) => void;
  updateShortcut: (action: keyof KeyboardShortcuts, key: string) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
}

const DEFAULT_SHORTCUTS: KeyboardShortcuts = {
  togglePlay: 'Control+ ',
  replayChunk: 'Control+r',
  checkAnswer: 'Control+Enter',
};

const DEFAULT_SETTINGS: PracticeSettings = {
  replayCount: 1,
  hideVideo: false,
  shortcuts: DEFAULT_SHORTCUTS,
};

const PracticeSettingsContext = createContext<PracticeSettingsContextType | undefined>(undefined);

export const PracticeSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<PracticeSettings>(() => {
    if (typeof window === 'undefined') return DEFAULT_SETTINGS;
    const saved = localStorage.getItem('practiceSettings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('practiceSettings', JSON.stringify(settings));
  }, [settings]);

  const setReplayCount = (replayCount: ReplayCount) => {
    setSettings(prev => ({ ...prev, replayCount }));
  };

  const setHideVideo = (hideVideo: boolean) => {
    setSettings(prev => ({ ...prev, hideVideo }));
  };

  const updateShortcut = (action: keyof KeyboardShortcuts, key: string) => {
    setSettings(prev => ({
      ...prev,
      shortcuts: { ...prev.shortcuts, [action]: key }
    }));
  };

  return (
    <PracticeSettingsContext.Provider value={{ ...settings, setReplayCount, setHideVideo, updateShortcut, isSettingsOpen, setIsSettingsOpen }}>
      {children}
    </PracticeSettingsContext.Provider>
  );
};

export const usePracticeSettings = () => {
  const context = useContext(PracticeSettingsContext);
  if (context === undefined) {
    throw new Error('usePracticeSettings must be used within a PracticeSettingsProvider');
  }
  return context;
};
