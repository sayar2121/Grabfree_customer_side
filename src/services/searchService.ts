import { MOCK_STORES, MOCK_COUPONS, MOCK_DEALS, MOCK_BLOGS } from './mockData';
import type { SearchResult } from '@/types';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const searchService = {
  async search(query: string): Promise<SearchResult> {
    await delay(500);
    const q = query.toLowerCase();
    return {
      stores: MOCK_STORES.filter((s) => s.name.toLowerCase().includes(q)).slice(0, 4),
      coupons: MOCK_COUPONS.filter((c) => c.title.toLowerCase().includes(q) || c.store?.name.toLowerCase().includes(q)).slice(0, 4),
      deals: MOCK_DEALS.filter((d) => d.title.toLowerCase().includes(q) || d.store?.name.toLowerCase().includes(q)).slice(0, 4),
      blogs: MOCK_BLOGS.filter((b) => b.title.toLowerCase().includes(q)).slice(0, 3),
    };
  },

  async getSuggestions(query: string): Promise<string[]> {
    await delay(200);
    const q = query.toLowerCase();
    const storeNames = MOCK_STORES.filter((s) => s.name.toLowerCase().includes(q)).map((s) => s.name);
    const categories = ['Fashion', 'Electronics', 'Food & Dining', 'Travel', 'Beauty', 'Sports'].filter((c) => c.toLowerCase().includes(q));
    return [...storeNames, ...categories].slice(0, 6);
  },
};
