import { useAuthContext } from "../../contexts/AuthContext";
import Login from "./Login";
import Dashboard from "./Dashboard";

export default function Account() {
  const { isLoggedIn } = useAuthContext();
  if (isLoggedIn) {
    return (
      <>
        <Dashboard />
      </>
    );
  }
  return (
    <>
      <Login />
    </>
  );
}
