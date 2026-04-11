import { UserVideo, Folder } from './types';

export const MOCK_FOLDERS: Folder[] = [
  { id: 'all', name: 'Tất cả video', count: 45, icon: 'Inbox' },
  { id: 'in-progress', name: 'Đang học', count: 12, icon: 'Clock' },
  { id: 'completed', name: 'Hoàn thành', count: 28, icon: 'CheckCircle' },
  { id: 'favorites', name: 'Yêu thích', count: 5, icon: 'Heart' },
  { id: 'folder-1', name: 'IELTS Prep', count: 8, color: 'blue' },
  { id: 'folder-2', name: 'Business English', count: 15, color: 'emerald' },
  { id: 'folder-3', name: 'Movies & TV', count: 6, color: 'purple' },
];

export const MOCK_USER_VIDEOS: UserVideo[] = [
  {
    id: 'uv1',
    title: 'Business English Basics: Networking',
    thumbnail: 'https://picsum.photos/seed/business1/1280/720',
    duration: '8:45',
    level: 'B1',
    topic: 'Business',
    progress: 75,
    channel: 'TED-Ed',
    addedAt: '2026-04-10T10:00:00Z',
    lastPracticed: '2026-04-11T12:00:00Z',
    status: 'in-progress',
    chunksTotal: 12,
    chunksCompleted: 9,
    folderId: 'folder-2',
    isFavorite: true
  },
  {
    id: 'uv2',
    title: 'IELTS Speaking Test Sample - Band 8.0',
    thumbnail: 'https://picsum.photos/seed/ielts1/1280/720',
    duration: '15:20',
    level: 'B2',
    topic: 'IELTS',
    progress: 20,
    channel: 'IELTS Advantage',
    addedAt: '2026-04-09T15:30:00Z',
    lastPracticed: '2026-04-10T14:00:00Z',
    status: 'in-progress',
    chunksTotal: 20,
    chunksCompleted: 4,
    folderId: 'folder-1'
  },
  {
    id: 'uv3',
    title: 'Daily English Conversation: At the Restaurant',
    thumbnail: 'https://picsum.photos/seed/daily1/1280/720',
    duration: '5:10',
    level: 'A2',
    topic: 'Daily',
    progress: 100,
    channel: 'English Class 101',
    addedAt: '2026-04-08T09:00:00Z',
    lastPracticed: '2026-04-09T10:00:00Z',
    status: 'completed',
    chunksTotal: 8,
    chunksCompleted: 8,
    folderId: 'folder-3'
  },
  {
    id: 'uv4',
    title: 'Advanced Vocabulary for Technology',
    thumbnail: 'https://picsum.photos/seed/tech1/1280/720',
    duration: '12:30',
    level: 'C1',
    topic: 'Technology',
    progress: 0,
    channel: 'Learn English with TV Series',
    addedAt: '2026-04-11T08:00:00Z',
    status: 'not-started',
    chunksTotal: 15,
    chunksCompleted: 0,
    isNew: true
  }
];
