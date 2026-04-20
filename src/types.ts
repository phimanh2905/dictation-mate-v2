export type Page = 'home' | 'explore' | 'study-room' | 'practice' | 'mastery' | 'vocab' | 'profile' | 'create' | 'leaderboard' | 'statistics' | 'settings' | 'library' | 'pricing' | 'onboarding' | 'login';

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  level: CEFRLevel;
  topic: string;
  progress: number;
  views?: string;
  isTrending?: boolean;
  isNew?: boolean;
}

export interface Topic {
  id: string;
  name: string;
  icon: string;
  videoCount: number;
  color: string;
}

export type Mood = 'Focused' | 'Tired' | 'Stressed' | 'Curious' | 'Confident' | 'Busy';

export interface YouTubeInfo {
  videoId: string;
  title: string;
  channel: string;
  thumbnail: string;
  duration: string;
}

export interface CreateVideoPayload {
  url: string;
  title: string;
  thumbnail: string;
  language: string;
  level: CEFRLevel;
  topics: string[];
  folder?: string;
}

export interface KanbanItem {
  id: string;
  videoId: string;
  status: 'to-learn' | 'learning' | 'mastered';
}

export interface Folder {
  id: string;
  name: string;
  count: number;
  icon?: string;
  color?: string;
}

export interface UserVideo extends Video {
  channel: string;
  lastPracticed?: string;
  addedAt: string;
  folderId?: string;
  status: 'not-started' | 'in-progress' | 'completed';
  chunksTotal: number;
  chunksCompleted: number;
  isFavorite?: boolean;
}

export type PracticeMode = 'dictation' | 'shadowing' | 'speaking' | 'summary';

export interface TranscriptLine {
  timestamp: number;
  text: string;
  chunkIndex: number;
}

export type ReplayCount = 1 | 3 | 5;

export interface KeyboardShortcuts {
  togglePlay: string;
  replayChunk: string;
  checkAnswer: string;
}

export interface PracticeSettings {
  replayCount: ReplayCount;
  hideVideo: boolean;
  shortcuts: KeyboardShortcuts;
}
