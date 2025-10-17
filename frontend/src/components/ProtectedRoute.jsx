import useAuthStore from "@/store/auth.js";
import { Navigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import CentralizedWrapper from "@/components/CentralizedWrapper";

function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuthStore();

  if (isLoading)
    return (
      <CentralizedWrapper>
        <Spinner />
      </CentralizedWrapper>
    );

  if (!user) return <Navigate to="/auth/login" replace />;

  return children;
}

export default ProtectedRoute;
