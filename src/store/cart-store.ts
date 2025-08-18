import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types/product";

export type CartItem = Product & { quantity: number };

type CartState = {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (name: string) => void;
  removeProduct: (name: string) => void;
  incrementItem: (name: string) => void;
  updateItemQuantity: (name: string, quantity: number) => void;
  clearCart: () => void;
  getTotalQuantity: () => number;
  getTotalPrice: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.name === product.name
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.name === product.name
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { items: [...state.items, { ...product, quantity }] };
        }),

      updateItemQuantity: (name, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.name === name ? { ...item, quantity } : item
          ),
        })),

      removeItem: (name) =>
        set((state) => {
          const existing = state.items.find((item) => item.name === name);
          if (!existing) return state;

          if (existing.quantity > 1) {
            return {
              items: state.items.map((item) =>
                item.name === name
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
            };
          }

          return { items: state.items.filter((item) => item.name !== name) };
        }),

      incrementItem: (name) =>
        set((state) => {
          const existing = state.items.find((item) => item.name === name);
          if (!existing) return state; // Si no existe, no hace nada

          return {
            items: state.items.map((item) =>
              item.name === name
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }),

      removeProduct: (name) =>
        set((state) => ({
          items: state.items.filter((item) => item.name !== name),
        })),

      clearCart: () => set({ items: [] }),

      getTotalQuantity: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce(
          (acc, item) =>
            acc + item.quantity * (item.price_discount ?? item.price),
          0
        ),
    }),
    {
      name: "cart-storage",
    }
  )
);
