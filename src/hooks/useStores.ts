import { useQuery } from '@tanstack/react-query';
import { storeService } from '@/services/storeService';

export function useStores(params?: { category?: string; search?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['stores', params],
    queryFn: () => storeService.getStores(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useStoreBySlug(slug: string) {
  return useQuery({
    queryKey: ['store', slug],
    queryFn: () => storeService.getStoreBySlug(slug),
    enabled: !!slug,
  });
}

export function useFeaturedStores() {
  return useQuery({
    queryKey: ['stores', 'featured'],
    queryFn: () => storeService.getFeaturedStores(),
    staleTime: 10 * 60 * 1000,
  });
}
