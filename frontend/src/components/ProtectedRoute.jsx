import useAuthStore from "@/store/auth.js";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuthStore();

  if (isLoading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/auth/login" replace />;

  return children;
}

export default ProtectedRoute;
