import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: { translation: {
    app: { name: 'Dictation Mate' },
    nav: { 
      home: 'Home', 
      explore: 'Explore', 
      vocab: 'Vocabulary', 
      profile: 'Profile',
      library: 'My Library',
      create: 'Add Video',
      studyRoom: 'Study Room',
      leaderboard: 'Leaderboard',
      statistics: 'Statistics',
      settings: 'Settings',
      upgrade: 'Upgrade'
    },
    home: { 
      welcome: 'Welcome back, {{name}}! 👋',
      streakMessage: 'You have a {{count}}-day streak. Keep it up!',
      continue: 'Continue Learning',
      viewProgress: 'View Progress'
    },
    mastery: {
      title: 'Mastery Lab',
      streak: 'Day Streak',
      hours: 'Hours Studied',
      xp: 'XP Earned',
      level: 'Level',
      calendar: 'Streak Calendar',
      practiceToday: 'Practice today to keep your streak going!'
    },
    pricing: {
      title: 'Choose Your Plan',
      subtitle: 'Unlock advanced features to accelerate your English learning journey',
      free: 'Free',
      plus: 'Plus',
      pro: 'Pro',
      monthly: 'Monthly',
      yearly: 'Yearly',
      upgrade: 'Upgrade Now',
      current: 'Current Plan',
      popular: 'MOST POPULAR ⭐',
      billedYearly: '/mo (billed yearly)',
      month: '/month',
      compare: 'Compare Features',
      faq: 'Frequently Asked Questions'
    },
    error: {
      404: {
        title: 'Page Not Found',
        subtitle: 'The page you\'re looking for doesn\'t exist or may have moved. No worries — your learning streak is safe!',
        ctaHome: 'Back to Home',
        ctaExplore: 'Explore Lessons',
        ctaRetry: 'Try Again'
      },
      403: {
        title: 'Access Denied',
        subtitle: 'This content is for Plus/Pro members. Upgrade to unlock unlimited video creation, advanced analytics, and personalized AI coaching.',
        ctaPricing: 'View Pricing',
        ctaLogin: 'Log In',
        ctaHome: 'Go Home'
      },
      502: {
        title: 'Service Temporarily Unavailable',
        subtitle: 'Our servers are taking a quick breather. Your progress is saved — we\'ll have you back to learning in no time!',
        ctaRetry: 'Retry',
        ctaSupport: 'Contact Support',
        ctaHome: 'Go Home',
        retrying: 'Retrying in {{seconds}}s...'
      }
    }
  }},
  vi: { translation: {
    app: { name: 'Dictation Mate' },
    nav: { 
      home: 'Trang chủ', 
      explore: 'Khám phá', 
      vocab: 'Từ vựng', 
      profile: 'Hồ sơ',
      library: 'Thư viện',
      create: 'Thêm Video',
      studyRoom: 'Phòng học',
      leaderboard: 'Bảng xếp hạng',
      statistics: 'Thống kê',
      settings: 'Cài đặt',
      upgrade: 'Nâng cấp'
    },
    home: { 
      welcome: 'Chào mừng {{name}}! 👋',
      streakMessage: 'Bạn đã học {{count}} ngày liên tiếp. Tiếp tục phát huy!',
      continue: 'Tiếp tục học',
      viewProgress: 'Xem tiến độ'
    },
    mastery: {
      title: 'Phòng thí nghiệm',
      streak: 'Ngày liên tiếp',
      hours: 'Giờ đã học',
      xp: 'Điểm XP',
      level: 'Trình độ',
      calendar: 'Lịch chuỗi ngày',
      practiceToday: 'Luyện tập hôm nay để duy trì chuỗi ngày của bạn!'
    },
    pricing: {
      title: 'Chọn gói của bạn',
      subtitle: 'Mở khóa các tính năng nâng cao để tăng tốc hành trình học tiếng Anh của bạn',
      free: 'Miễn phí',
      plus: 'Plus',
      pro: 'Pro',
      monthly: 'Hàng tháng',
      yearly: 'Hàng năm',
      upgrade: 'Nâng cấp ngay',
      current: 'Gói hiện tại',
      popular: 'PHỔ BIẾN NHẤT ⭐',
      billedYearly: '/tháng (thanh toán năm)',
      month: '/tháng',
      compare: 'So sánh tính năng',
      faq: 'Câu hỏi thường gặp'
    },
    error: {
      404: {
        title: 'Không tìm thấy trang',
        subtitle: 'Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển. Đừng lo — chuỗi ngày học tập của bạn vẫn an toàn!',
        ctaHome: 'Quay lại Trang chủ',
        ctaExplore: 'Khám phá bài học',
        ctaRetry: 'Thử lại'
      },
      403: {
        title: 'Truy cập bị từ chối',
        subtitle: 'Nội dung này dành cho thành viên Plus/Pro. Nâng cấp để mở khóa tạo video không giới hạn và huấn luyện viên AI cá nhân.',
        ctaPricing: 'Xem bảng giá',
        ctaLogin: 'Đăng nhập',
        ctaHome: 'Về trang chủ'
      },
      502: {
        title: 'Dịch vụ tạm thời không khả dụng',
        subtitle: 'Máy chủ của chúng tôi đang tạm nghỉ một chút. Tiến trình của bạn đã được lưu — chúng tôi sẽ sớm đưa bạn quay lại việc học!',
        ctaRetry: 'Thử lại',
        ctaSupport: 'Liên hệ hỗ trợ',
        ctaHome: 'Về trang chủ',
        retrying: 'Thử lại sau {{seconds}} giây...'
      }
    }
  }}
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi', // default
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
