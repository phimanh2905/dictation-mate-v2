import { Video, Topic } from './types';

export const TOPICS: Topic[] = [
  { id: 'business', name: 'Business', icon: '💼', videoCount: 24, color: '#8B5CF6' },
  { id: 'tech', name: 'Tech', icon: '💻', videoCount: 18, color: '#3B82F6' },
  { id: 'daily-life', name: 'Daily Life', icon: '🏠', videoCount: 31, color: '#22C55E' },
  { id: 'science', name: 'Science', icon: '🔬', videoCount: 12, color: '#F59E0B' },
  { id: 'arts', name: 'Arts', icon: '🎨', videoCount: 9, color: '#EF4444' },
];

export const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'How to Negotiate Your Salary',
    thumbnail: 'https://picsum.photos/seed/negotiate/800/450',
    duration: '12:34',
    level: 'B2',
    topic: 'Business',
    progress: 45,
    views: '1.2k',
    isTrending: true,
  },
  {
    id: '2',
    title: 'React vs Vue in 2025',
    thumbnail: 'https://picsum.photos/seed/tech/800/450',
    duration: '8:15',
    level: 'B2',
    topic: 'Tech',
    progress: 0,
    views: '890',
    isTrending: true,
  },
  {
    id: '3',
    title: 'Morning Routines of CEOs',
    thumbnail: 'https://picsum.photos/seed/morning/800/450',
    duration: '5:30',
    level: 'B1',
    topic: 'Daily Life',
    progress: 0,
    isNew: true,
  },
  {
    id: '4',
    title: 'Climate Change Explained',
    thumbnail: 'https://picsum.photos/seed/science/800/450',
    duration: '12:15',
    level: 'C1',
    topic: 'Science',
    progress: 60,
  },
  {
    id: '5',
    title: 'Coffee Culture Around the World',
    thumbnail: 'https://picsum.photos/seed/coffee/800/450',
    duration: '6:20',
    level: 'A2',
    topic: 'Daily Life',
    progress: 0,
  },
];
