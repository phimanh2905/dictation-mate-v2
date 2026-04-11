import { YouTubeInfo } from '../types';

export const isValidYouTubeURL = (url: string): boolean => {
  const pattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  return pattern.test(url);
};

export const extractVideoId = (url: string): string | null => {
  const pattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(pattern);
  return match ? match[1] : null;
};

export const fetchYouTubeInfo = async (url: string): Promise<YouTubeInfo> => {
  // In a real app, this would call a backend or YouTube oEmbed API
  // For this demo, we'll simulate a fetch with mock data based on the URL
  await new Promise(resolve => setTimeout(resolve, 800));

  const videoId = extractVideoId(url);
  if (!videoId) throw new Error('Invalid YouTube URL');

  // Mock data
  return {
    videoId,
    title: "Mastering English Pronunciation: 10 Common Mistakes",
    channel: "English with Lucy",
    thumbnail: `https://picsum.photos/seed/${videoId}/1280/720`,
    duration: "12:45"
  };
};
