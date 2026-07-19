import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import api from "../lib/axios";
import { Cart } from "../types";
import { useAuth } from "./AuthContext";

interface CartContextType {
  cart: Cart | null;
  itemCount: number;
  loading: boolean;
  refreshCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  const refreshCart = useCallback(async () => {
    if (!user) {
      setCart(null);
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.get("/cart");
      setCart(data.cart);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addToCart = async (productId: string, quantity = 1) => {
    const { data } = await api.post("/cart", { productId, quantity });
    setCart(data.cart);
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    const { data } = await api.put(`/cart/${productId}`, { quantity });
    setCart(data.cart);
  };

  const removeItem = async (productId: string) => {
    const { data } = await api.delete(`/cart/${productId}`);
    setCart(data.cart);
  };

  const clearCart = async () => {
    await api.delete("/cart");
    setCart((prev) => (prev ? { ...prev, items: [] } : prev));
  };

  const itemCount = cart?.items.reduce((sum, i) => sum + i.quantity, 0) || 0;

  return (
    <CartContext.Provider
      value={{ cart, itemCount, loading, refreshCart, addToCart, updateQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};
