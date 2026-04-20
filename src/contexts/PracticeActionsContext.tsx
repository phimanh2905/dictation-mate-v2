import React, { createContext, useContext, useCallback, useRef } from 'react';

interface PracticeActions {
  togglePlay: () => void;
  replayChunk: () => void;
  checkAnswer: () => void;
}

const PracticeActionsContext = createContext<PracticeActions | undefined>(undefined);

export const PracticeActionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const actionsRef = useRef<Partial<PracticeActions>>({});

  const registerAction = useCallback((name: keyof PracticeActions, action: () => void) => {
    actionsRef.current[name] = action;
  }, []);

  const togglePlay = useCallback(() => actionsRef.current.togglePlay?.(), []);
  const replayChunk = useCallback(() => actionsRef.current.replayChunk?.(), []);
  const checkAnswer = useCallback(() => actionsRef.current.checkAnswer?.(), []);

  return (
    <PracticeActionsContext.Provider value={{ togglePlay, replayChunk, checkAnswer, registerAction } as any}>
      {children}
    </PracticeActionsContext.Provider>
  );
};

export const usePracticeActions = () => {
  const context = useContext(PracticeActionsContext);
  if (context === undefined) {
    throw new Error('usePracticeActions must be used within a PracticeActionsProvider');
  }
  return context;
};

export const useRegisterAction = () => {
  const context = useContext(PracticeActionsContext);
  if (context === undefined) {
    throw new Error('useRegisterAction must be used within a PracticeActionsProvider');
  }
  return (context as any).registerAction as (name: keyof PracticeActions, action: () => void) => void;
};
