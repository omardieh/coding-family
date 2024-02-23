import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import axios from "axios";

export default function GoogleAuth() {
  const { storeToken, authenticateUser } = useAuthContext();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      axios
        .post(`${import.meta.env.VITE_SERVER_URL}/auth/google`, { code })
        .then((response) => {
          storeToken(response.data.authToken);
          authenticateUser();
        })
        .catch((error) => {
          console.error("GoogleAuth : ", error);
        });
    } else {
      console.error("Missing access code in the URL.");
    }
  }, [code, authenticateUser, storeToken]);
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}
