 /** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF6B35',
          red: '#FF3B6B',
          violet: '#7C3AED',
          navy: '#0F1628',
          dark: '#080D1A',
          darker: '#050910',
          card: 'rgba(255,255,255,0.04)',
          border: 'rgba(255,255,255,0.08)',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #FF6B35 0%, #FF3B6B 100%)',
        'gradient-violet': 'linear-gradient(135deg, #7C3AED 0%, #FF3B6B 100%)',
        'gradient-dark': 'linear-gradient(180deg, #080D1A 0%, #0F1628 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(255,59,107,0.05) 100%)',
      },
      boxShadow: {
        'brand': '0 0 40px rgba(255, 107, 53, 0.25)',
        'brand-sm': '0 0 20px rgba(255, 107, 53, 0.15)',
        'card': '0 8px 32px rgba(0,0,0,0.4)',
        'glow': '0 0 60px rgba(255, 59, 107, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite linear',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}
