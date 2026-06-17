import { useQuery } from '@tanstack/react-query';
import { couponService } from '@/services/couponService';

export function useCoupons(params?: { category?: string; store_id?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['coupons', params],
    queryFn: () => couponService.getCoupons(params),
    staleTime: 3 * 60 * 1000,
  });
}

export function useLatestCoupons(limit = 8) {
  return useQuery({
    queryKey: ['coupons', 'latest', limit],
    queryFn: () => couponService.getLatestCoupons(limit),
    staleTime: 5 * 60 * 1000,
  });
}
