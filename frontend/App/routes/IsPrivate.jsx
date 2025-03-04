import { LoadingSpinner, Notifier } from "/common/components";
import { useAuthContext } from "/features/Auth/context";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useAuthContext();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      const { onError } = Notifier();
      onError("You need to be logged in to access this page");
      const timer = setTimeout(() => {
        setRedirect(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, isLoading]);

  if (isLoading) return <LoadingSpinner />;
  if (redirect) return <Navigate to="/login" />;
  if (isLoggedIn) return children;
  return <LoadingSpinner />;
}
