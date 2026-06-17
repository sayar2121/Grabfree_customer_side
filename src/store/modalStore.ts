import { create } from 'zustand';
import { type Coupon } from '@/types';

interface ModalStore {
  isOpen: boolean;
  activeCoupon: Coupon | null;
  openModal: (coupon: Coupon) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>()((set) => ({
  isOpen: false,
  activeCoupon: null,
  openModal: (coupon) => set({ isOpen: true, activeCoupon: coupon }),
  closeModal: () => set({ isOpen: false, activeCoupon: null }),
}));
