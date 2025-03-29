import { useEffect } from "react";
import { LoadingSpinner, Notifier } from "/common/components";
import { Navigate, useNavigate } from "react-router-dom";
import { useErrorContext } from "../../error-boundaries/context";
import { useAuthHook } from "../hooks";
import { useAuthContext } from "../context";

export function Logout() {
  const navigate = useNavigate();
  const { onSuccess } = Notifier();
  const { handleError } = useErrorContext();
  const { logUserOut } = useAuthHook();
  const { authenticateUser } = useAuthContext();

  const { data, isLoading, isValidating, error } = logUserOut();
  const response = data?.data;

  useEffect(() => {
    let timeoutID;
    if (response) {
      const { success, message } = response;
      if (success) {
        onSuccess({ message, redirect: "login", options: { autoClose: 2500 } });
        timeoutID = setTimeout(() => {
          authenticateUser();
          navigate("/login");
        }, 2500);
      }
    }
    return () => clearTimeout(timeoutID);
  }, [response, navigate, onSuccess, authenticateUser]);

  if (isLoading || isValidating) return <LoadingSpinner />;
  if (error) {
    handleError(error);
    return <Navigate to="/error" />;
  }

  return <LoadingSpinner />;
}
