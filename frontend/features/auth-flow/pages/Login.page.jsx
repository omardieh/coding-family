import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { LoginForm, SocialLoginLink, AuthFormLayout } from "../components";
import { useAuthContext } from "../context";
import { useAuthHook } from "../hooks";
import {
  LoadingSpinner,
  PageLayout,
  PageCard,
  Notifier,
} from "/common/components";
import { validateFormInputs } from "../handlers";
import { useErrorContext } from "../../error-boundaries/context";

export function Login() {
  const navigate = useNavigate();
  const { onSuccess } = Notifier();
  const { authenticateUser } = useAuthContext();
  const { logUserIn, storeUserToken } = useAuthHook();
  const { handleError } = useErrorContext();
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const { data, isLoading, isValidating, error } = logUserIn(
    loginFormData,
    isFetching
  );

  useEffect(() => {
    // handle user token
    const headersAuth = data?.headers?.authorization;
    if (headersAuth) {
      const accessToken = headersAuth.split(" ")[1];
      storeUserToken(accessToken);
    }

    // Handle response data
    const respData = data?.data;
    let timeoutID = null;
    if (respData) {
      const { success, message } = respData;
      if (success) {
        onSuccess({ message, options: { autoClose: 2500 } });
        timeoutID = setTimeout(() => {
          authenticateUser();
          navigate("/");
        }, 2500);
        return;
      }
      setErrorMessage(message);
    }

    // Handle errors
    if (error) {
      handleError(error);
      setErrorMessage(error);
      console.log(error);
    }
    return () => clearTimeout(timeoutID);
  }, [
    authenticateUser,
    data?.data,
    data?.headers?.authorization,
    navigate,
    onSuccess,
    storeUserToken,
    error,
    handleError,
  ]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!validateFormInputs({ ...loginFormData, setErrorMessage })) return;
    try {
      setIsFetching(true);
    } catch (error) {
      console.log(error);
      setErrorMessage(error?.response?.data);
    }
  };

  const handleLoginInput = ({ target: { name, value } }) =>
    setLoginFormData({ ...loginFormData, [name]: value });

  if (isLoading || isValidating) return <LoadingSpinner />;

  return (
    <PageLayout>
      <PageCard sx={{ marginTop: "1em" }}>
        <AuthFormLayout>
          <>
            <LoginForm
              loginFormData={loginFormData}
              handleLoginSubmit={handleLoginSubmit}
              handleLoginInput={handleLoginInput}
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
