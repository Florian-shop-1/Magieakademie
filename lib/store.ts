import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  preis_cents: number;
  bild_url: string;
  menge: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "menge">) => void;
  removeItem: (id: string) => void;
  updateMenge: (id: string, menge: number) => void;
  clearCart: () => void;
  total: () => number;
  itemCount: () => number;
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find((i) => i.id === item.id);
        if (existing) {
          set({ items: get().items.map((i) => i.id === item.id ? { ...i, menge: i.menge + 1 } : i) });
        } else {
          set({ items: [...get().items, { ...item, menge: 1 }] });
        }
      },
      removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      updateMenge: (id, menge) => {
        if (menge <= 0) {
          get().removeItem(id);
        } else {
          set({ items: get().items.map((i) => i.id === id ? { ...i, menge } : i) });
        }
      },
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.preis_cents * i.menge, 0),
      itemCount: () => get().items.reduce((sum, i) => sum + i.menge, 0),
    }),
    { name: "magieakademie-cart" }
  )
);

type AuthStore = {
  user: { id: string; email: string; vorname: string; nachname: string; rolle: string } | null;
  setUser: (user: AuthStore["user"]) => void;
  logout: () => void;
};

export const useAuth = create<AuthStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
