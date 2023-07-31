import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

export default function GithubAuth() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  useEffect(() => {
    if (code) {
      axios
        .post(`${import.meta.env.VITE_SERVER_URL}/auth/github`, { code })
        .then((response) => {
          storeToken(response.data.authToken);
          authenticateUser();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error("Missing access code in the URL.");
    }
  }, [code, navigate, authenticateUser, storeToken]);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}
