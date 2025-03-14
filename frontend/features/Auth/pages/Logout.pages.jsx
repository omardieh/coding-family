import { useEffect } from "react";
import { useAuthContext } from "/features/Auth/context";

export function Logout() {
  const { logUserOut } = useAuthContext();
  useEffect(() => {
    logUserOut();
  }, []);
  return "loading...";
}
