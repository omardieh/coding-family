import { useAuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useAuthContext();

  if (isLoading) return <p>Loading ...</p>;
  if (!isLoggedIn) {
    return <Navigate to="/account/login" />;
  } else {
    return children;
  }
}

export default IsPrivate;
