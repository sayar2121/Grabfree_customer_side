import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Coupon, type Deal } from '@/types';

type WishlistItem =
  | { type: 'coupon'; item: Coupon }
  | { type: 'deal'; item: Deal };

interface WishlistStore {
  items: WishlistItem[];
  addCoupon: (coupon: Coupon) => void;
  addDeal: (deal: Deal) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  count: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addCoupon: (coupon) =>
        set((state) => {
          if (state.items.find((i) => i.item.id === coupon.id)) return state;
          return { items: [...state.items, { type: 'coupon', item: coupon }] };
        }),
      addDeal: (deal) =>
        set((state) => {
          if (state.items.find((i) => i.item.id === deal.id)) return state;
          return { items: [...state.items, { type: 'deal', item: deal }] };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.item.id !== id) })),
      isInWishlist: (id) => get().items.some((i) => i.item.id === id),
      clearWishlist: () => set({ items: [] }),
      count: () => get().items.length,
    }),
    { name: 'grabfree-wishlist' }
  )
);
