import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "/common/contexts/AuthContext";
import AuthService from "/common/services/AuthService";

export default function GoogleAuth() {
  const { storeToken, authenticateUser } = useAuthContext();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      AuthService.loginGoogle(code)
        .then((response) => {
          const accessToken = response.headers.authorization.split(" ")[1];
          storeToken(accessToken);
          authenticateUser();
        })
        .catch((error) => {
          console.error("GoogleAuth:", error);
        });
      return;
    }
    window.location.replace(`${import.meta.env.VITE_SERVER_URL}/auth/google`);
  }, [code, authenticateUser, storeToken]);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}
