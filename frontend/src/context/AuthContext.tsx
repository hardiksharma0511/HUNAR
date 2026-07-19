import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import api from "../lib/axios";
import { User } from "../types";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: "buyer" | "seller";
  sellerProfile?: {
    city: string;
    craft: string;
    story: string;
    specialization: string;
    yearsOfExperience: number;
    socialLinks?: {
      instagram?: string;
      facebook?: string;
      whatsapp?: string;
      website?: string;
    };
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("hunar_user");
    const token = localStorage.getItem("hunar_token");
    if (stored && token) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const persist = (token: string, user: User) => {
    localStorage.setItem("hunar_token", token);
    localStorage.setItem("hunar_user", JSON.stringify(user));
    setUser(user);
  };

  const login = async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", { email, password });
    persist(data.token, data.user);
  };

  const register = async (payload: RegisterPayload) => {
    const { data } = await api.post("/auth/register", payload);
    persist(data.token, data.user);
  };

  const logout = () => {
    localStorage.removeItem("hunar_token");
    localStorage.removeItem("hunar_user");
    setUser(null);
  };

  const updateUser = (updated: User) => {
    localStorage.setItem("hunar_user", JSON.stringify(updated));
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};