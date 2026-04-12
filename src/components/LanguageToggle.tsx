import { useTranslation } from 'react-i18next';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  
  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi');
  };
  
  return (
    <button 
      onClick={toggleLang}
      className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-bold hover:border-blue-300 transition-all shadow-sm"
    >
      <span className="text-lg leading-none">{i18n.language === 'vi' ? '🇻🇳' : '🇬🇧'}</span>
      <span className="uppercase text-[10px] tracking-wider text-gray-600">{i18n.language}</span>
    </button>
  );
}
