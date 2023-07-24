import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard() {
  const { isLoggedIn, user } = useContext(AuthContext);

  return <> {JSON.stringify(user)} </>;
}
