export interface Store {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  website_url: string;
  affiliate_url: string;
  seo_title?: string;
  seo_description?: string;
  status: 'active' | 'inactive';
  coupon_count?: number;
  deal_count?: number;
  category?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  count?: number;
}

export interface Coupon {
  id: string;
  store_id: string;
  store?: Store;
  title: string;
  description: string;
  coupon_code: string;
  expiry_date: string;
  click_count: number;
  success_count: number;
  failure_count: number;
  status: 'active' | 'expired' | 'upcoming';
  category?: string;
  is_exclusive?: boolean;
  is_verified?: boolean;
  discount_value?: string;
  min_purchase?: number;
}

export interface Deal {
  id: string;
  store_id: string;
  store?: Store;
  title: string;
  description: string;
  deal_url: string;
  old_price: number;
  new_price: number;
  discount_percent: number;
  image: string;
  expiry_date: string;
  status: 'active' | 'expired' | 'upcoming';
  category?: string;
  is_featured?: boolean;
  is_trending?: boolean;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  thumbnail: string;
  seo_title?: string;
  seo_description?: string;
  author_id: string;
  author_name: string;
  author_avatar?: string;
  status: 'published' | 'draft';
  created_at: string;
  read_time?: number;
  tags?: string[];
  category?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link: string;
  cta_text?: string;
  is_active: boolean;
}

export interface SearchResult {
  stores: Store[];
  coupons: Coupon[];
  deals: Deal[];
  blogs: Blog[];
}

export interface NewsletterSubscription {
  email: string;
}

export interface ApiResponse<T> {
  data: T;
  total?: number;
  page?: number;
  limit?: number;
  message?: string;
}

export interface BankOffer {
  id: string;
  bank_name: string;
  bank_logo: string;
  card_type: string;
  discount_type: string;
  discount_value: string;
  max_discount?: string;
  min_transaction?: string;
  valid_till: string;
  store_id?: string;
  store?: Store;
  terms: string[];
}

export type SortOption = 'newest' | 'expiring_soon' | 'most_popular' | 'discount_high';
