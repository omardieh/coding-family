import { Navigate } from "react-router-dom";
import { useAuthContext } from "/features/Auth/context";
import { LoadingSpinner } from "/common/components";

function IsAnon({ children }) {
  const { isLoggedIn, isLoading } = useAuthContext();
  if (isLoading) return <LoadingSpinner />;
  if (isLoggedIn) return <Navigate to="/dashboard" />;
  return children;
}

export default IsAnon;
