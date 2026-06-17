import { useState, useEffect, useCallback } from 'react';
import { searchService } from '@/services/searchService';

export function useSearch(debounceMs = 350) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debounce = <T extends unknown[]>(fn: (...args: T) => void, delay: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: T) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchSuggestions = useCallback(
    debounce(async (q: string) => {
      if (!q.trim() || q.length < 2) { setSuggestions([]); return; }
      setIsLoading(true);
      try {
        const results = await searchService.getSuggestions(q);
        setSuggestions(results);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs),
    []
  );

  useEffect(() => {
    fetchSuggestions(query);
  }, [query, fetchSuggestions]);

  return { query, setQuery, suggestions, isLoading, clearSuggestions: () => setSuggestions([]) };
}
