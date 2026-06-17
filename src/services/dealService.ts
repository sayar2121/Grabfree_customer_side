import { MOCK_DEALS } from './mockData';
import type { Deal, ApiResponse } from '@/types';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const dealService = {
  async getDeals(params?: { category?: string; store_id?: string; page?: number; limit?: number }): Promise<ApiResponse<Deal[]>> {
    await delay(400);
    let deals = [...MOCK_DEALS];
    if (params?.category) deals = deals.filter((d) => d.category === params.category);
    if (params?.store_id) deals = deals.filter((d) => d.store_id === params.store_id);
    const limit = params?.limit || 12;
    const page = params?.page || 1;
    const start = (page - 1) * limit;
    return { data: deals.slice(start, start + limit), total: deals.length, page, limit };
  },

  async getTrendingDeals(limit = 6): Promise<Deal[]> {
    await delay(300);
    return MOCK_DEALS.filter((d) => d.is_trending).slice(0, limit);
  },

  async getFeaturedDeals(limit = 4): Promise<Deal[]> {
    await delay(300);
    return MOCK_DEALS.filter((d) => d.is_featured).slice(0, limit);
  },

  async getDealById(id: string): Promise<Deal | null> {
    await delay(200);
    return MOCK_DEALS.find((d) => d.id === id) || null;
  },
};
