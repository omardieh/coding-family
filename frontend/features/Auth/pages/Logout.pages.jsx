import { useEffect } from "react";
import { useAuth } from "/features/Auth/hooks";
import { Notifier } from "/common/components";
import { useNavigate } from "react-router-dom";

export function Logout() {
  const { onSuccess } = Notifier();
  const { data: response, error, logUserOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logUserOut();
  }, []);

  useEffect(() => {
    let timeoutID;
    if (response) {
      const { success, message } = response;
      if (success) {
        onSuccess({ message, redirect: "login", options: { autoClose: 1500 } });
        timeoutID = setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    }
    return () => clearTimeout(timeoutID);
  }, [response]);

  return "loading...";
}
