import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "/common/contexts/AuthContext";

export default function GithubAuth() {
  const { storeToken, authenticateUser } = useAuthContext();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      axios
        .post(`${import.meta.env.VITE_SERVER_URL}/auth/github`, { code })
        .then((response) => {
          storeToken(response.headers.accessToken);
          authenticateUser();
        })
        .catch((error) => {
          console.error("GithubAuth : ", error);
        });
    } else {
      console.error("Missing [access code] in the URL.");
    }
  }, [code, authenticateUser, storeToken]);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}
