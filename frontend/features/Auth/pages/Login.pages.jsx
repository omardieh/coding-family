import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import {
  LoginForm,
  SocialLoginLink,
  AuthFormLayout,
} from "/features/Auth/components";
import { useAuthContext } from "/features/Auth/context";
import { useAuth } from "/features/Auth/hooks";
import { LoadingSpinner, PageLayout, PageCard } from "/common/components";
import { validateFormInputs } from "/features/Auth/handlers";

export function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const { storeToken, authenticateUser } = useAuthContext();
  const {
    logUserIn,
    data: response,
    loading: loginLoading,
    error: loginError,
  } = useAuth();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { email, password } = {
      email: data.get("email"),
      password: data.get("password"),
    };

    if (!validateFormInputs({ email, password, setErrorMessage })) return;

    try {
      await logUserIn({ email, password });
      const accessToken = response.headers.authorization.split(" ")[1];
      storeToken(accessToken);
      authenticateUser();
      navigate("/");
    } catch (_) {
      setErrorMessage(loginError);
    }
  };

  if (loginLoading) return <LoadingSpinner />;

  return (
    <PageLayout>
      <PageCard sx={{ marginTop: "1em" }}>
        <AuthFormLayout>
          <>
            <LoginForm
              handleSubmit={handleLoginSubmit}
              errorMessage={errorMessage}
            />
          </>
          <>
            <SocialLoginLink
              to={`/login/github`}
              styleLink={{ width: "100%" }}
              styleButton={{ padding: "1em 0", marginTop: "2em" }}
            >
              Login with GitHub
              <FaGithub style={{ fontSize: "2em", marginLeft: ".5em" }} />
            </SocialLoginLink>
            <SocialLoginLink
              to={`/login/google`}
              styleLink={{ width: "100%" }}
              styleButton={{ padding: "1em 0", marginTop: "2em" }}
            >
              Login with Google
              <FcGoogle style={{ fontSize: "2em", marginLeft: ".5em" }} />
            </SocialLoginLink>
          </>
        </AuthFormLayout>
      </PageCard>
    </PageLayout>
  );
}
