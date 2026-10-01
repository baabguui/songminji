import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "admin/contexts/AuthContext";

const ProtectedRoute = () => {
  const { session, loading } = useAuth();

  if (loading) return null;
  if (!session) return <Navigate to="/admin/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
