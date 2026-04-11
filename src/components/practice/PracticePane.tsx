import React from 'react';
import { AnimatePresence } from 'motion/react';
import { PracticeMode, Video } from '../../types';
import DictationPanel from './DictationPanel';
import ShadowingPanel from './ShadowingPanel';
import SpeakingPanel from './SpeakingPanel';
import WritingPanel from './WritingPanel';

interface PracticePaneProps {
  mode: PracticeMode;
  video: Video;
}

export default function PracticePane({ mode, video }: PracticePaneProps) {
  return (
    <div className="h-full flex flex-col bg-transparent overflow-hidden">
      <AnimatePresence mode="wait">
        {mode === 'dictation' && <DictationPanel key="dictation" />}
        {mode === 'shadowing' && <ShadowingPanel key="shadowing" />}
        {mode === 'speaking' && <SpeakingPanel key="speaking" />}
        {mode === 'writing' && <WritingPanel key="writing" />}
      </AnimatePresence>
    </div>
  );
}
