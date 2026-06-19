import { Link } from 'react-router-dom';
import { MOCK_TOP_BANNER } from '@/services/mockData';

export default function TopBanner() {
  const banner = MOCK_TOP_BANNER;
  
  if (!banner) return null;

  return (
    <div className="w-full py-1.5 px-4 flex items-center justify-center gap-3 text-sm font-sans border-b theme-border-subtle theme-bg-tertiary transition-colors duration-300">
      <div className="flex items-center gap-2 max-w-[1200px] w-full justify-center">
        {banner.iconUrl && (
          <img src={banner.iconUrl} alt="Offer Icon" className="w-5 h-5 object-contain bg-brand-orange rounded-full p-[2px]" />
        )}
        <span className="font-semibold theme-text text-[13px] tracking-tight transition-colors duration-300">{banner.text}</span>
        <Link 
          to={banner.link}
          className="bg-gradient-brand hover:opacity-90 text-white text-[11px] font-bold px-4 py-1.5 rounded-full transition-colors ml-2 tracking-wide shadow-sm"
        >
          {banner.buttonText}
        </Link>
      </div>
    </div>
  );
}
