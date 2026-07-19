import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import api from "../lib/axios";
import { Product } from "../types";
import { useAuth } from "./AuthContext";

interface WishlistContextType {
  wishlist: Product[];
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => Promise<void>;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) {
      setWishlist([]);
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.get("/users/wishlist");
      setWishlist(data.wishlist);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { refresh(); }, [refresh]);

  const isWishlisted = (productId: string) => wishlist.some((p) => p._id === productId);

  const toggleWishlist = async (productId: string) => {
    if (!user) return;
    if (isWishlisted(productId)) {
      await api.delete(`/users/wishlist/${productId}`);
      setWishlist((prev) => prev.filter((p) => p._id !== productId));
    } else {
      await api.post(`/users/wishlist/${productId}`);
      await refresh();
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, isWishlisted, toggleWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
};