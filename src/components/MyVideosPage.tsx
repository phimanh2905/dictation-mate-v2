import React, { useState, useMemo } from 'react';
import { Search, Plus, Loader2 } from 'lucide-react';
import { Page, UserVideo, Folder } from '../types';
import { MOCK_FOLDERS, MOCK_USER_VIDEOS } from '../mockLibrary';
import FolderSidebar from './library/FolderSidebar';
import FilterTabs from './library/FilterTabs';
import SortControls from './library/SortControls';
import LibraryVideoCard from './library/LibraryVideoCard';
import EmptyState from './library/EmptyState';

interface MyVideosPageProps {
  onNavigate: (page: Page) => void;
  onAddVideo: () => void;
}

export default function MyVideosPage({ onNavigate, onAddVideo }: MyVideosPageProps) {
  const [videos, setVideos] = useState<UserVideo[]>(MOCK_USER_VIDEOS);
  const [folders, setFolders] = useState<Folder[]>(MOCK_FOLDERS);
  const [selectedFolderId, setSelectedFolderId] = useState('all');
  const [activeTabId, setActiveTabId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(false);

  const filterTabs = [
    { id: 'all', label: 'Tất cả', count: videos.length },
    { id: 'in-progress', label: 'Đang học', count: videos.filter(v => v.status === 'in-progress').length },
    { id: 'completed', label: 'Hoàn thành', count: videos.filter(v => v.status === 'completed').length },
    { id: 'not-started', label: 'Chưa bắt đầu', count: videos.filter(v => v.status === 'not-started').length },
  ];

  const filteredVideos = useMemo(() => {
    return videos
      .filter(video => {
        const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFolder = selectedFolderId === 'all' 
          || (selectedFolderId === 'in-progress' && video.status === 'in-progress')
          || (selectedFolderId === 'completed' && video.status === 'completed')
          || (selectedFolderId === 'favorites' && video.isFavorite)
          || video.folderId === selectedFolderId;
        const matchesTab = activeTabId === 'all' || video.status === activeTabId;
        
        return matchesSearch && matchesFolder && matchesTab;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'newest': return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
          case 'oldest': return new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime();
          case 'name-asc': return a.title.localeCompare(b.title);
          case 'name-desc': return b.title.localeCompare(a.title);
          case 'progress': return b.progress - a.progress;
          case 'duration': {
            const getSecs = (d: string) => {
              const [m, s] = d.split(':').map(Number);
              return m * 60 + s;
            };
            return getSecs(b.duration) - getSecs(a.duration);
          }
          default: return 0;
        }
      });
  }, [videos, selectedFolderId, activeTabId, searchQuery, sortBy]);

  const handleAction = (videoId: string, action: string, data?: any) => {
    switch (action) {
      case 'practice':
        onNavigate('practice');
        break;
      case 'favorite':
        setVideos(prev => prev.map(v => v.id === videoId ? { ...v, isFavorite: !v.isFavorite } : v));
        break;
      case 'delete':
        if (confirm('Xóa vĩnh viễn video này?')) {
          setVideos(prev => prev.filter(v => v.id !== videoId));
        }
        break;
      case 'move':
        setVideos(prev => prev.map(v => v.id === videoId ? { ...v, folderId: data } : v));
        break;
      default:
        console.log('Action:', action, 'Video:', videoId, 'Data:', data);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 border-b border-gray-200 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Thư viện của tôi</h1>
          <p className="text-sm text-gray-500 mt-1">
            {videos.length} video • {videos.filter(v => v.status === 'in-progress').length} đang học • {videos.filter(v => v.status === 'completed').length} hoàn thành
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Tìm video..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
          
          <button 
            onClick={onAddVideo}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Thêm video</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0 gap-8">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <FolderSidebar 
            folders={folders} 
            selectedFolderId={selectedFolderId} 
            onSelectFolder={setSelectedFolderId}
            onCreateFolder={() => console.log('Create folder')}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <FilterTabs 
              tabs={filterTabs} 
              activeTabId={activeTabId} 
              onTabChange={setActiveTabId} 
            />
            <SortControls 
              sortBy={sortBy} 
              onSortChange={setSortBy} 
              viewMode={viewMode} 
              onViewModeChange={setViewMode} 
            />
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 size={40} className="text-blue-600 animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Đang tải thư viện...</p>
              </div>
            ) : filteredVideos.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6" 
                : "flex flex-col gap-3"
              }>
                {filteredVideos.map((video) => (
                  <LibraryVideoCard 
                    key={video.id} 
                    video={video} 
                    folders={folders}
                    viewMode={viewMode}
                    onClick={() => onNavigate('practice')}
                    onAction={(action, data) => handleAction(video.id, action, data)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState 
                type={searchQuery ? 'search-no-results' : 'no-videos'} 
                onAction={searchQuery ? () => setSearchQuery('') : onAddVideo}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
