import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import type { ReactNode } from "react";

export const ProtectedRoute = ({
  children,
  requireAdmin,
}: {
  children: ReactNode;
  requireAdmin?: boolean;
}) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();
  if (!isAuthenticated)
    return <Navigate to="/login" state={{ from: location }} replace />;
  if (requireAdmin && user?.role !== "Admin")
    return <Navigate to="/menu" replace />;
  return <>{children}</>;
};
