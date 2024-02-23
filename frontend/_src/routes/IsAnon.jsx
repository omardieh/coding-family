import Loading from "/features/Loading";
import { useAuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

function IsAnon({ children }) {
  const { isLoggedIn, isLoading } = useAuthContext();
  if (isLoading) return <Loading />;
  if (isLoggedIn) return <Navigate to="/account/dashboard" />;
  return children;
}

export default IsAnon;
