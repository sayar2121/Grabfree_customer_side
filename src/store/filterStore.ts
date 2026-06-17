import { create } from 'zustand';
import { type SortOption } from '@/types';

interface FilterStore {
  selectedCategory: string | null;
  selectedStore: string | null;
  sortBy: SortOption;
  searchQuery: string;
  priceMin: number | null;
  priceMax: number | null;
  setCategory: (cat: string | null) => void;
  setStore: (store: string | null) => void;
  setSortBy: (sort: SortOption) => void;
  setSearchQuery: (q: string) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>()((set) => ({
  selectedCategory: null,
  selectedStore: null,
  sortBy: 'newest',
  searchQuery: '',
  priceMin: null,
  priceMax: null,
  setCategory: (cat) => set({ selectedCategory: cat }),
  setStore: (store) => set({ selectedStore: store }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  setPriceRange: (min, max) => set({ priceMin: min, priceMax: max }),
  resetFilters: () =>
    set({
      selectedCategory: null,
      selectedStore: null,
      sortBy: 'newest',
      searchQuery: '',
      priceMin: null,
      priceMax: null,
    }),
}));
