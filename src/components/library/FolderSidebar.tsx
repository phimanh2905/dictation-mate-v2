import React from 'react';
import { 
  Inbox, 
  Clock, 
  CheckCircle, 
  Heart, 
  Folder as FolderIcon, 
  Plus,
  MoreVertical
} from 'lucide-react';
import { Folder } from '../../types';

interface FolderSidebarProps {
  folders: Folder[];
  selectedFolderId: string;
  onSelectFolder: (id: string) => void;
  onCreateFolder: () => void;
}

export default function FolderSidebar({ 
  folders, 
  selectedFolderId, 
  onSelectFolder, 
  onCreateFolder 
}: FolderSidebarProps) {
  const defaultFolders = folders.filter(f => ['all', 'in-progress', 'completed', 'favorites'].includes(f.id));
  const userFolders = folders.filter(f => !['all', 'in-progress', 'completed', 'favorites'].includes(f.id));

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Inbox': return <Inbox size={18} />;
      case 'Clock': return <Clock size={18} />;
      case 'CheckCircle': return <CheckCircle size={18} />;
      case 'Heart': return <Heart size={18} />;
      default: return <FolderIcon size={18} />;
    }
  };

  const getColorClass = (color?: string) => {
    switch (color) {
      case 'blue': return 'text-blue-500';
      case 'emerald': return 'text-emerald-500';
      case 'purple': return 'text-purple-500';
      case 'orange': return 'text-orange-500';
      case 'pink': return 'text-pink-500';
      default: return 'text-gray-400';
    }
  };

  const renderFolderItem = (folder: Folder) => {
    const isActive = selectedFolderId === folder.id;
    const isDefault = ['all', 'in-progress', 'completed', 'favorites'].includes(folder.id);

    return (
      <button
        key={folder.id}
        onClick={() => onSelectFolder(folder.id)}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all group ${
          isActive 
            ? 'bg-blue-50 text-blue-600 font-semibold' 
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className={isActive ? 'text-blue-600' : isDefault ? 'text-gray-400' : getColorClass(folder.color)}>
            {getIcon(folder.icon)}
          </span>
          <span className="text-sm truncate">{folder.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs ${isActive ? 'text-blue-500' : 'text-gray-400'}`}>
            {folder.count}
          </span>
          {!isDefault && (
            <MoreVertical size={14} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600" />
          )}
        </div>
      </button>
    );
  };

  return (
    <aside className="w-60 flex-shrink-0 space-y-8 pr-4">
      <div className="space-y-1">
        {defaultFolders.map(renderFolderItem)}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-3">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Thư mục</p>
          <button 
            onClick={onCreateFolder}
            className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all"
          >
            <Plus size={14} />
          </button>
        </div>
        <div className="space-y-1">
          {userFolders.map(renderFolderItem)}
          <button
            onClick={onCreateFolder}
            className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all text-sm font-medium italic"
          >
            <Plus size={18} />
            Tạo thư mục mới
          </button>
        </div>
      </div>
    </aside>
  );
}
