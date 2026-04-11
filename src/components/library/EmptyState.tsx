import React from 'react';
import { Folder, Search, Plus } from 'lucide-react';

interface EmptyStateProps {
  type: 'no-videos' | 'folder-empty' | 'search-no-results';
  title?: string;
  description?: string;
  onAction?: () => void;
  actionLabel?: string;
}

export default function EmptyState({ type, title, description, onAction, actionLabel }: EmptyStateProps) {
  const getIcon = () => {
    switch (type) {
      case 'no-videos': return <Folder size={48} className="text-gray-300" />;
      case 'folder-empty': return <Folder size={48} className="text-gray-300" />;
      case 'search-no-results': return <Search size={48} className="text-gray-300" />;
    }
  };

  const getDefaultTitle = () => {
    switch (type) {
      case 'no-videos': return 'Thư viện của bạn đang trống';
      case 'folder-empty': return 'Thư mục này chưa có video nào';
      case 'search-no-results': return 'Không tìm thấy video phù hợp';
    }
  };

  const getDefaultDescription = () => {
    switch (type) {
      case 'no-videos': return 'Bắt đầu thêm video YouTube để tạo bài học của riêng mình.';
      case 'folder-empty': return 'Di chuyển video vào đây để dễ dàng quản lý bài học của bạn.';
      case 'search-no-results': return 'Thử từ khóa khác hoặc xóa bộ lọc để xem tất cả video.';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-3xl border border-dashed border-gray-200">
      <div className="mb-6 p-6 bg-gray-50 rounded-full">
        {getIcon()}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title || getDefaultTitle()}</h3>
      <p className="text-gray-500 max-w-sm mb-8">{description || getDefaultDescription()}</p>
      
      {onAction && (
        <button
          onClick={onAction}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
        >
          {type === 'no-videos' && <Plus size={20} />}
          {actionLabel || (type === 'no-videos' ? 'Thêm video đầu tiên' : 'Xem tất cả')}
        </button>
      )}

      {type === 'no-videos' && (
        <div className="mt-12 pt-8 border-t border-gray-100 w-full max-w-md">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Gợi ý cho bạn</p>
          <div className="grid grid-cols-3 gap-4">
            {['Video TED Talks', 'Phim ngắn', 'Bài hát English'].map((sug) => (
              <div key={sug} className="p-3 bg-gray-50 rounded-xl text-[11px] font-bold text-gray-600">
                {sug}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
