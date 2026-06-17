import { useQuery } from '@tanstack/react-query';
import { dealService } from '@/services/dealService';

export function useDeals(params?: { category?: string; store_id?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['deals', params],
    queryFn: () => dealService.getDeals(params),
    staleTime: 3 * 60 * 1000,
  });
}

export function useTrendingDeals(limit = 6) {
  return useQuery({
    queryKey: ['deals', 'trending', limit],
    queryFn: () => dealService.getTrendingDeals(limit),
    staleTime: 5 * 60 * 1000,
  });
}

export function useFeaturedDeals(limit = 4) {
  return useQuery({
    queryKey: ['deals', 'featured', limit],
    queryFn: () => dealService.getFeaturedDeals(limit),
    staleTime: 5 * 60 * 1000,
  });
}
