import { MOCK_BLOGS } from './mockData';
import type { Blog, ApiResponse } from '@/types';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const blogService = {
  async getBlogs(params?: { page?: number; limit?: number }): Promise<ApiResponse<Blog[]>> {
    await delay(400);
    const limit = params?.limit || 9;
    const page = params?.page || 1;
    const start = (page - 1) * limit;
    return { data: MOCK_BLOGS.slice(start, start + limit), total: MOCK_BLOGS.length, page, limit };
  },

  async getBlogBySlug(slug: string): Promise<Blog | null> {
    await delay(300);
    return MOCK_BLOGS.find((b) => b.slug === slug) || null;
  },

  async getLatestBlogs(limit = 3): Promise<Blog[]> {
    await delay(300);
    return MOCK_BLOGS.slice(0, limit);
  },
};
