import { useState, useEffect, useCallback } from 'react';
import { PracticeMode } from '../types';

const STORAGE_KEY = 'dm2-practice-layout-prefs';

const DEFAULT_RATIOS: Record<PracticeMode, number> = {
  dictation: 40,
  shadowing: 50,
  speaking: 35,
  writing: 30,
};

export function usePracticeLayout() {
  const [userRatios, setUserRatios] = useState<Record<PracticeMode, number>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return { ...DEFAULT_RATIOS, ...JSON.parse(saved) };
        } catch (e) {
          return DEFAULT_RATIOS;
        }
      }
    }
    return DEFAULT_RATIOS;
  });

  const saveRatio = useCallback((mode: PracticeMode, videoSize: number) => {
    setUserRatios(prev => {
      const newRatios = { ...prev, [mode]: videoSize };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newRatios));
      return newRatios;
    });
  }, []);

  return { userRatios, saveRatio };
}
