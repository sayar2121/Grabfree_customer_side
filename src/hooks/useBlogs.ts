import { useQuery } from '@tanstack/react-query';
import { blogService } from '@/services/blogService';

export function useBlogs(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['blogs', params],
    queryFn: () => blogService.getBlogs(params),
    staleTime: 10 * 60 * 1000,
  });
}

export function useLatestBlogs(limit = 3) {
  return useQuery({
    queryKey: ['blogs', 'latest', limit],
    queryFn: () => blogService.getLatestBlogs(limit),
    staleTime: 10 * 60 * 1000,
  });
}

export function useBlogBySlug(slug: string) {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: () => blogService.getBlogBySlug(slug),
    enabled: !!slug,
  });
}
