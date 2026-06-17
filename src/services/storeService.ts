import { MOCK_STORES } from './mockData';
import type { Store, ApiResponse } from '@/types';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const storeService = {
  async getStores(params?: { category?: string; search?: string; page?: number; limit?: number }): Promise<ApiResponse<Store[]>> {
    await delay(400);
    let stores = [...MOCK_STORES];
    if (params?.category) stores = stores.filter((s) => s.category === params.category);
    if (params?.search) stores = stores.filter((s) => s.name.toLowerCase().includes(params.search!.toLowerCase()));
    const limit = params?.limit || 12;
    const page = params?.page || 1;
    const start = (page - 1) * limit;
    return { data: stores.slice(start, start + limit), total: stores.length, page, limit };
  },

  async getStoreBySlug(slug: string): Promise<Store | null> {
    await delay(300);
    return MOCK_STORES.find((s) => s.slug === slug) || null;
  },

  async getFeaturedStores(): Promise<Store[]> {
    await delay(300);
    return MOCK_STORES.slice(0, 8);
  },
};
