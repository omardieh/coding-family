import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "../context";
import { useAuthHook } from "/features/auth-flow/hooks";
import { LoadingSpinner } from "/common/components";

export function LoginGoogle() {
  const [isFetching, setIsFetching] = useState(false);
  const { authenticateUser } = useAuthContext();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const { logGoogleUserIn, storeUserToken } = useAuthHook();
  const { data, isLoading, isValidating, error } = logGoogleUserIn(
    code,
    isFetching
  );

  const headersAuth = data?.headers?.authorization;

  useEffect(() => {
    if (code) setIsFetching(true);

    if (headersAuth) {
      const accessToken = headersAuth.split(" ")[1];
      storeUserToken(accessToken);
      authenticateUser();
      return;
    }

    if (error) {
      console.log(error);
      return;
    }

    if (!code)
      window.location.replace(`${import.meta.env.VITE_SERVER_URL}/auth/google`);
  }, [code, headersAuth, error]);

  if (isLoading || isValidating) return <LoadingSpinner />;

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}
