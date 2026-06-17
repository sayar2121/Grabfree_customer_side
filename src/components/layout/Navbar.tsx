import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, Sun, Moon, Menu, X, Tag, ChevronDown } from 'lucide-react';
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

  // Sync activeHash when location changes (like navigating from another page)
  useEffect(() => {
    setActiveHash(location.hash || '');
  }, [location.hash]);

  // Custom active link logic to handle hashes
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
      const currentScrollY = window.scrollY;
      
      // Add background when scrolled past top
      setIsScrolled(currentScrollY > 20);
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('/#')) {
      const id = path.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        // If we're already on the home page, just scroll smoothly
        if (window.location.pathname === '/') {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', path);
          setActiveHash(path.substring(1));
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
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
          isScrolled
            ? 'backdrop-blur-xl border-b theme-border-subtle shadow-sm'
            : 'bg-transparent'
        )}
        style={isScrolled ? { backgroundColor: 'var(--nav-bg-scrolled)' } : undefined}
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
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={cn('nav-link', isActiveLink(link.path) && 'active')}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Search Toggle */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="w-9 h-9 rounded-xl icon-btn-theme flex items-center justify-center"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative w-9 h-9 rounded-xl icon-btn-theme flex items-center justify-center"
              >
                <Heart className="w-4 h-4" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-brand rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-xl icon-btn-theme flex items-center justify-center"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden w-9 h-9 rounded-xl icon-btn-theme flex items-center justify-center"
              >
                {isMobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
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
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    autoFocus
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search stores, coupons, deals..."
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
              <div className="section-container py-4 space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={(e) => handleNavClick(e, link.path)}
                    className={cn('block px-4 py-2.5 rounded-lg text-sm font-medium transition-all',
                        isActiveLink(link.path) ? 'bg-gradient-card text-brand-orange border border-brand-orange/20' : 'theme-text-secondary hover:theme-text hover:theme-bg-subtle')
                    }
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer */}
      <div className="h-16 lg:h-[70px]" />
    </>
  );
}
