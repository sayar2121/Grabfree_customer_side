import { useEffect } from 'react';
import { useThemeStore } from '@/store/themeStore';

/**
 * ThemeProvider – keeps the `dark` class on <html> in sync with themeStore.
 * Tailwind's darkMode:'class' strategy reads this class.
 */
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { isDark } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return <>{children}</>;
}
