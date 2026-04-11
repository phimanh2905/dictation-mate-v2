import React from 'react';
import { 
  Play, 
  FolderInput, 
  Edit3, 
  Heart, 
  Share2, 
  Trash2, 
  Info,
  ChevronRight
} from 'lucide-react';
import { UserVideo, Folder } from '../../types';

interface VideoActionsMenuProps {
  video: UserVideo;
  folders: Folder[];
  onAction: (action: string, data?: any) => void;
  onClose: () => void;
}

export default function VideoActionsMenu({ video, folders, onAction, onClose }: VideoActionsMenuProps) {
  const userFolders = folders.filter(f => !['all', 'in-progress', 'completed', 'favorites'].includes(f.id));

  return (
    <div className="w-56 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-50 py-1">
      <button 
        onClick={() => onAction('practice')}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
      >
        <Play size={16} fill="currentColor" />
        {video.progress > 0 ? 'Tiếp tục học' : 'Bắt đầu học'}
      </button>

      <div className="h-px bg-gray-100 my-1" />

      <div className="relative group/submenu">
        <button className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <FolderInput size={16} className="text-gray-400" />
            Di chuyển đến
          </div>
          <ChevronRight size={14} className="text-gray-400" />
        </button>
        
        <div className="absolute left-full top-0 ml-px w-48 bg-white border border-gray-200 rounded-xl shadow-xl opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all py-1">
          {userFolders.map(folder => (
            <button
              key={folder.id}
              onClick={() => onAction('move', folder.id)}
              className="w-full text-left px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
            >
              {folder.name}
            </button>
          ))}
          <div className="h-px bg-gray-100 my-1" />
          <button
            onClick={() => onAction('new-folder')}
            className="w-full text-left px-4 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors"
          >
            + Thư mục mới
          </button>
        </div>
      </div>

      <button 
        onClick={() => onAction('edit')}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Edit3 size={16} className="text-gray-400" />
        Chỉnh sửa metadata
      </button>

      <button 
        onClick={() => onAction('favorite')}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Heart size={16} className={video.isFavorite ? 'text-rose-500 fill-rose-500' : 'text-gray-400'} />
        {video.isFavorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
      </button>

      <button 
        onClick={() => onAction('share')}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Share2 size={16} className="text-gray-400" />
        Chia sẻ
      </button>

      <div className="h-px bg-gray-100 my-1" />

      <button 
        onClick={() => onAction('delete')}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors"
      >
        <Trash2 size={16} />
        Xóa
      </button>

      <div className="h-px bg-gray-100 my-1" />

      <div className="px-4 py-2 space-y-1">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <Info size={10} />
          Thông tin
        </div>
        <p className="text-[10px] text-gray-500">Thêm ngày: {new Date(video.addedAt).toLocaleDateString()}</p>
        <p className="text-[10px] text-gray-500">Thời lượng: {video.duration}</p>
        <p className="text-[10px] text-gray-500">Số chunks: {video.chunksTotal}</p>
      </div>
    </div>
  );
}
