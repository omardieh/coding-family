import Loading from "../components/Loading";
import { useAuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useAuthContext();
  if (isLoading) return <Loading />;
  if (!isLoggedIn) return <Navigate to="/account/login" />;
  return children;
}
