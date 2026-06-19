import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, Sun, Moon, Menu, X, Store, LayoutGrid, Calendar, List, Plus, Zap } from 'lucide-react';
import { NAV_LINKS, APP_NAME } from '@/constants';
import { useThemeStore } from '@/store/themeStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useSearch } from '@/hooks/useSearch';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const [activeHash, setActiveHash] = useState(location.hash || '');
  const { isDark, toggleTheme } = useThemeStore();
  const { items } = useWishlistStore();
  const navigate = useNavigate();
  const { query, setQuery, suggestions, clearSuggestions } = useSearch();

  // Sync activeHash when location changes
  useEffect(() => {
    setActiveHash(location.hash || '');
  }, [location.hash]);

  const isActiveLink = (path: string) => {
    if (path.startsWith('/#')) {
      return location.pathname === '/' && activeHash === path.substring(1);
    }
    if (path === '/') {
      return location.pathname === '/' && !activeHash;
    }
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('/#')) {
      const id = path.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        if (window.location.pathname === '/') {
          e.preventDefault();
          setIsMobileOpen(false);
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 150);
          window.history.pushState(null, '', path);
          setActiveHash(path.substring(1));
          return;
        }
      }
    }
    setIsMobileOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) { navigate(`/search?q=${encodeURIComponent(query)}`); clearSuggestions(); setShowSearch(false); }
  };

  const handleSuggestionClick = (s: string) => {
    navigate(`/search?q=${encodeURIComponent(s)}`); clearSuggestions(); setShowSearch(false);
  };

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: '-100%' },
        }}
        initial="visible"
        animate="visible"
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={cn(
          'transition-colors duration-300',
          'theme-bg-primary border-b theme-border-subtle shadow-sm'
        )}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 lg:h-[70px]">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img 
                src={isDark ? "/Dark%20Mode%20Logo_NOBG.png" : "/Light%20Mode%20Logo_NOBG.png"} 
                alt={APP_NAME} 
                className="w-40 lg:w-48 h-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6">
              {NAV_LINKS.map((link) => {
                const isActive = isActiveLink(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={(e) => handleNavClick(e, link.path)}
                    className={cn(
                      'text-sm font-medium transition-colors pb-1 border-b-2',
                      isActive 
                        ? 'text-brand-orange border-brand-orange' 
                        : 'theme-text hover:text-brand-orange border-transparent'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Search Toggle */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="w-10 h-10 rounded-xl border theme-border-subtle flex items-center justify-center hover:bg-[var(--bg-hover)] transition-colors"
              >
                <Search className="w-4 h-4 theme-text" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative w-10 h-10 rounded-xl border theme-border-subtle flex items-center justify-center hover:bg-[var(--bg-hover)] transition-colors"
              >
                <Heart className="w-4 h-4 theme-text" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-brand rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl border theme-border-subtle flex items-center justify-center hover:bg-[var(--bg-hover)] transition-colors"
              >
                {isDark ? <Sun className="w-4 h-4 theme-text" /> : <Moon className="w-4 h-4 theme-text" />}
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden w-10 h-10 rounded-xl border theme-border-subtle flex items-center justify-center hover:bg-[var(--bg-hover)] transition-colors"
              >
                {isMobileOpen ? <X className="w-4 h-4 theme-text" /> : <Menu className="w-4 h-4 theme-text" />}
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Sub-nav (Bottom Tier) */}
        <div className="hidden lg:block border-t theme-border-subtle theme-bg-primary">
          <div className="section-container overflow-x-auto scrollbar-hide">
            <div className="flex items-center justify-between h-12 min-w-max gap-8 pr-4 lg:pr-0">
              <div className="flex items-center gap-6">
                <Link to="/stores" className="flex items-center gap-2 text-sm font-medium theme-text-secondary hover:text-brand-orange transition-colors">
                  <Store className="w-4 h-4" /> Stores
                </Link>
                <Link to="/categories" className="flex items-center gap-2 text-sm font-medium theme-text-secondary hover:text-brand-orange transition-colors">
                  <LayoutGrid className="w-4 h-4" /> Categories
                </Link>
                <Link to="/sales" className="flex items-center gap-2 text-sm font-medium theme-text-secondary hover:text-brand-orange transition-colors">
                  <Calendar className="w-4 h-4" /> June Sales
                </Link>
                <Link to="/indulge" className="flex items-center gap-2 text-sm font-medium theme-text-secondary hover:text-brand-orange transition-colors">
                  <List className="w-4 h-4" /> Indulge
                </Link>
              </div>

              <div className="flex items-center gap-6">
                <Link to="/submit" className="flex items-center gap-2 text-sm font-medium theme-text-secondary hover:text-brand-orange transition-colors">
                  <Plus className="w-4 h-4" /> Submit Coupon
                </Link>
                <Link to="/deals-of-the-day" className="flex items-center gap-2 text-sm font-medium theme-text-secondary hover:text-brand-orange transition-colors">
                  <Zap className="w-4 h-4" /> Deals Of The Day
                </Link>
                <Link to="/fathers-day" className="flex items-center gap-2 px-4 py-1.5 bg-gradient-brand hover:opacity-90 text-white text-sm font-medium rounded-full transition-all shadow-sm">
                  Father's Day Offers
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Search Dropdown */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="border-t theme-border-subtle backdrop-blur-xl"
              style={{ backgroundColor: 'var(--nav-bg-scrolled)' }}
            >
              <div className="section-container py-4">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10" />
                  <input
                    autoFocus
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search stores, coupons, deals..."
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    className="w-full rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-brand-orange/50 transition-all theme-text theme-bg-input border theme-border-strong placeholder:text-[color:var(--text-muted)]"
                  />
                </form>
                {suggestions.length > 0 && (
                  <div className="mt-2 rounded-xl border theme-border-base overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestionClick(s)}
                        className="w-full text-left px-4 py-2.5 text-sm theme-text-secondary hover:bg-white/[0.05] dark:hover:bg-white/[0.05] hover:text-[color:var(--text-primary)] transition-colors flex items-center gap-2"
                      >
                        <Search className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} /> {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t theme-border-subtle backdrop-blur-xl overflow-hidden"
              style={{ backgroundColor: 'var(--nav-bg-scrolled)' }}
            >
              <div className="section-container py-4 flex">
                {/* Left Column: Main Nav */}
                <div className="w-1/2 pr-2 space-y-1">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={(e) => handleNavClick(e, link.path)}
                      className={cn('block px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all',
                          isActiveLink(link.path) ? 'bg-gradient-card text-brand-orange border border-brand-orange/20' : 'theme-text-secondary hover:theme-text hover:theme-bg-subtle')
                      }
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                
                {/* Right Column: Secondary Nav */}
                <div className="w-1/2 pl-2 border-l theme-border-subtle space-y-1">
                  <Link to="/stores" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-[13px] font-medium theme-text-secondary hover:theme-text hover:theme-bg-subtle transition-all">
                    <Store className="w-4 h-4 shrink-0" /> <span className="truncate">Stores</span>
                  </Link>
                  <Link to="/categories" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-[13px] font-medium theme-text-secondary hover:theme-text hover:theme-bg-subtle transition-all">
                    <LayoutGrid className="w-4 h-4 shrink-0" /> <span className="truncate">Categories</span>
                  </Link>
                  <Link to="/sales" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-[13px] font-medium theme-text-secondary hover:theme-text hover:theme-bg-subtle transition-all">
                    <Calendar className="w-4 h-4 shrink-0" /> <span className="truncate">June Sales</span>
                  </Link>
                  <Link to="/indulge" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-[13px] font-medium theme-text-secondary hover:theme-text hover:theme-bg-subtle transition-all">
                    <List className="w-4 h-4 shrink-0" /> <span className="truncate">Indulge</span>
                  </Link>
                  
                  <div className="my-2 border-t theme-border-subtle opacity-50"></div>
                  
                  <Link to="/submit" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-[13px] font-medium theme-text-secondary hover:theme-text hover:theme-bg-subtle transition-all">
                    <Plus className="w-4 h-4 shrink-0" /> <span className="truncate">Submit Coupon</span>
                  </Link>
                  <Link to="/deals-of-the-day" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-[13px] font-medium theme-text-secondary hover:theme-text hover:theme-bg-subtle transition-all">
                    <Zap className="w-4 h-4 shrink-0" /> <span className="truncate">Deals Of The Day</span>
                  </Link>
                  <Link to="/fathers-day" onClick={() => setIsMobileOpen(false)} className="flex items-center justify-center gap-2 px-3 py-2 mt-2 bg-gradient-brand text-white text-[11px] font-bold rounded-lg transition-all shadow-sm">
                    <span className="truncate">Father's Day Offers</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

    </>
  );
}
