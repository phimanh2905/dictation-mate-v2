export type Page = 'home' | 'explore' | 'study-room' | 'practice' | 'mastery' | 'vocab' | 'profile' | 'create' | 'leaderboard' | 'analytics' | 'settings';

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

export interface KanbanItem {
  id: string;
  videoId: string;
  status: 'to-learn' | 'learning' | 'mastered';
}
