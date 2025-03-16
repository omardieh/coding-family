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
import {
  LoadingSpinner,
  PageLayout,
  PageCard,
  Notifier,
} from "/common/components";
import { validateFormInputs } from "/features/Auth/handlers";

export function Login() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { onSuccess } = Notifier();
  const { storeToken, authenticateUser } = useAuthContext();
  const {
    logUserIn,
    data: response,
    headers: responseHeaders,
    loading: loginLoading,
    error: loginError,
  } = useAuth();

  useEffect(() => {
    if (loginError) setErrorMessage(loginError);
  }, [loginError]);

  useEffect(() => {
    if (responseHeaders) {
      const accessToken = responseHeaders.authorization.split(" ")[1];
      storeToken(accessToken);
      if (accessToken) authenticateUser();
    }
  }, [responseHeaders]);

  useEffect(() => {
    let timeoutID;
    if (response) {
      const { success, message } = response;
      if (success) {
        onSuccess({ message });
        timeoutID = setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    }
    return () => clearTimeout(timeoutID);
  }, [response]);

  const handleLoginInput = ({ target: { name, value } }) =>
    setLoginFormData({ ...loginFormData, [name]: value });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateFormInputs({ ...loginFormData, setErrorMessage })) return;
    try {
      await logUserIn(loginFormData);
    } catch (error) {
      setErrorMessage(error?.response?.data);
    }
  };

  if (loginLoading) return <LoadingSpinner />;

  return (
    <PageLayout>
      <PageCard sx={{ marginTop: "1em" }}>
        <AuthFormLayout>
          <>
            <LoginForm
              loginFormData={loginFormData}
              handleLoginSubmit={handleLoginSubmit}
              handleLoginInput={handleLoginInput}
              errorMessage={errorMessage || loginError}
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
