import { LoadingSpinner } from "/common/components";
import { useAuthContext } from "/features/Auth/context";
import { Navigate } from "react-router-dom";

export default function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useAuthContext();

  if (isLoading) return <LoadingSpinner />;
  if (!isLoggedIn) return <Navigate to="/login" />;
  if (isLoggedIn) return children;
}
