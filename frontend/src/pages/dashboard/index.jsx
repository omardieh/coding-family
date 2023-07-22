import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard() {
  const { isLoggedIn, user } = useContext(AuthContext);

  return <div> {JSON.stringify(user)} </div>;
}
