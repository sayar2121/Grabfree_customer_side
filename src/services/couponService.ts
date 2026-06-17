import { MOCK_COUPONS } from './mockData';
import type { Coupon, ApiResponse } from '@/types';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const couponService = {
  async getCoupons(params?: { category?: string; store_id?: string; page?: number; limit?: number }): Promise<ApiResponse<Coupon[]>> {
    await delay(400);
    let coupons = [...MOCK_COUPONS];
    if (params?.category) coupons = coupons.filter((c) => c.category === params.category);
    if (params?.store_id) coupons = coupons.filter((c) => c.store_id === params.store_id);
    const limit = params?.limit || 12;
    const page = params?.page || 1;
    const start = (page - 1) * limit;
    return { data: coupons.slice(start, start + limit), total: coupons.length, page, limit };
  },

  async getCouponById(id: string): Promise<Coupon | null> {
    await delay(200);
    return MOCK_COUPONS.find((c) => c.id === id) || null;
  },

  async revealCoupon(id: string): Promise<{ code: string }> {
    await delay(500);
    const coupon = MOCK_COUPONS.find((c) => c.id === id);
    return { code: coupon?.coupon_code || '' };
  },

  async getLatestCoupons(limit = 8): Promise<Coupon[]> {
    await delay(300);
    return MOCK_COUPONS.slice(0, limit);
  },
};
