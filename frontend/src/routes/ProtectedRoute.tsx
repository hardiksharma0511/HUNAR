import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "../components/ui/Spinner";

// Wraps a page that requires authentication (and optionally a specific role).
export const ProtectedRoute = ({ children, role }: { children: ReactNode; role?: "buyer" | "seller" }) => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner className="py-32" />;
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;

  return <>{children}</>;
};
