import { Link } from 'react-router-dom';
import { MOCK_TOP_BANNER } from '@/services/mockData';

export default function TopBanner() {
  const banner = MOCK_TOP_BANNER;
  
  if (!banner) return null;

  return (
    <div className="w-full py-1.5 px-2 sm:px-4 flex items-center justify-center gap-2 sm:gap-3 text-sm font-sans border-b theme-border-subtle theme-bg-tertiary transition-colors duration-300">
      <div className="flex items-center gap-1.5 sm:gap-2 max-w-[1200px] w-full justify-center">
        {banner.iconUrl && (
          <img src={banner.iconUrl} alt="Offer Icon" className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 object-contain bg-brand-orange rounded-full p-[2px]" />
        )}
        <span className="font-semibold theme-text text-[11px] sm:text-[13px] leading-tight tracking-tight transition-colors duration-300 line-clamp-2 sm:line-clamp-1">{banner.text}</span>
        <Link 
          to={banner.link}
          className="bg-gradient-brand hover:opacity-90 text-white text-[10px] sm:text-[11px] font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full transition-colors ml-1 sm:ml-2 tracking-wide shadow-sm whitespace-nowrap shrink-0"
        >
          {banner.buttonText}
        </Link>
      </div>
    </div>
  );
}
