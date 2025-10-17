import useAuthStore from "@/store/auth";
import { Navigate } from "react-router-dom";
import CentralizedWrapper from "@/components/CentralizedWrapper";
import { Spinner } from "@/components/ui/spinner";

function UserAuthControl({ children }) {
  const { user, isInitializing } = useAuthStore();

  if (isInitializing)
    return (
      <CentralizedWrapper>
        <Spinner />
      </CentralizedWrapper>
    );

  if (user) return <Navigate to="/dashboard" replace />;

  return children;
}

export default UserAuthControl;
