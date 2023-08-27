import { useAuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

function IsAnon({ children }) {
  const { isLoggedIn, isLoading } = useAuthContext();
  if (isLoading) return <p>Loading ...</p>;

  if (isLoggedIn) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

export default IsAnon;
