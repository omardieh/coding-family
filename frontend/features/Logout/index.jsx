import { useEffect } from "react";
import { useAuthContext } from "../../common/contexts/AuthContext";

export default function Logout() {
  const { logUserOut } = useAuthContext();
  useEffect(() => {
    logUserOut();
  }, []);
  return "loading...";
}
