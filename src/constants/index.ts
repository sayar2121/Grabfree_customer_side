export const APP_NAME = 'GrabFree';
export const APP_TAGLINE = 'Grab the Best Deals & Coupons';
export const APP_DESCRIPTION = 'Discover the latest coupons, promo codes and shopping deals from 500+ online stores in India.';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Deals', path: '/#deals' },
  { label: 'Categories', path: '/#categories' },
  { label: 'Coupons', path: '/#coupons' },
  { label: 'Stores', path: '/#stores' },
  { label: 'Bank Offers', path: '/#bank-offers' },
  { label: 'Blog', path: '/#blogs' },
];

export const CATEGORIES = [
  { id: '1', name: 'Fashion', slug: 'fashion', icon: '👗', color: '#FF6B9D' },
  { id: '2', name: 'Electronics', slug: 'electronics', icon: '💻', color: '#60A5FA' },
  { id: '3', name: 'Food & Dining', slug: 'food-dining', icon: '🍔', color: '#FB923C' },
  { id: '4', name: 'Travel', slug: 'travel', icon: '✈️', color: '#34D399' },
  { id: '5', name: 'Beauty', slug: 'beauty', icon: '💄', color: '#F472B6' },
  { id: '6', name: 'Sports', slug: 'sports', icon: '⚽', color: '#A78BFA' },
  { id: '7', name: 'Home & Living', slug: 'home-living', icon: '🏠', color: '#FBBF24' },
  { id: '8', name: 'Books', slug: 'books', icon: '📚', color: '#6EE7B7' },
  { id: '9', name: 'Grocery', slug: 'grocery', icon: '🛒', color: '#86EFAC' },
  { id: '10', name: 'Health', slug: 'health', icon: '💊', color: '#93C5FD' },
  { id: '11', name: 'Education', slug: 'education', icon: '🎓', color: '#FCD34D' },
  { id: '12', name: 'Entertainment', slug: 'entertainment', icon: '🎬', color: '#F87171' },
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'expiring_soon', label: 'Expiring Soon' },
  { value: 'most_popular', label: 'Most Popular' },
  { value: 'discount_high', label: 'Highest Discount' },
];

export const STATS = [
  { label: 'Active Coupons', value: '5,000+' },
  { label: 'Partner Stores', value: '500+' },
  { label: 'Happy Users', value: '2M+' },
  { label: 'Savings Generated', value: '₹10Cr+' },
];

export const SOCIAL_LINKS = [
  { name: 'Twitter', url: 'https://twitter.com/grabfree', icon: 'twitter' },
  { name: 'Instagram', url: 'https://instagram.com/grabfree', icon: 'instagram' },
  { name: 'Facebook', url: 'https://facebook.com/grabfree', icon: 'facebook' },
  { name: 'Telegram', url: 'https://t.me/grabfree', icon: 'send' },
];

export const FOOTER_LINKS = {
  speciality: [
    { label: 'AI Tools', path: '/ai-tools' },
    { label: 'Surge 2025', path: '/surge' },
    { label: 'Blog', path: '/blogs' },
    { label: 'Product Deals', path: '/product-deals' },
    { label: 'Charities', path: '/charities' },
  ],
  offers: [
    { label: 'City Offers', path: '/city-offers' },
    { label: 'Brand Offers', path: '/stores' },
    { label: 'Bank Offers', path: '/bank-offers' },
    { label: 'Festival Offers', path: '/festival-offers' },
    { label: 'Ajio Coupons', path: '/store/ajio' },
  ],
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Use', path: '/terms' },
    { label: 'Branding', path: '/branding' },
    { label: 'Careers', path: '/careers' },
    { label: 'Partner With Us', path: '/partner' },
    { label: 'Sitemap', path: '/sitemap' },
    { label: 'Feedback', path: '/feedback' },
  ],
};
