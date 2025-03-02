import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import {
  LoginForm,
  SocialLoginLink,
  LoginLayout,
} from "/features/Auth/components";
import { useAuthContext, useCaptchaContext } from "/features/Auth/context";
import { useAuth } from "/features/Auth/hooks";
import { LoadingSpinner, PageLayout, PageCard } from "/common/components";

export function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const { storeToken, authenticateUser } = useAuthContext();
  const { isVerified, isLoading: captchaLoading } = useCaptchaContext();
  const {
    logUserIn,
    data: response,
    loading: loginLoading,
    error: loginError,
  } = useAuth();

  useEffect(() => {
    handleCaptchaError();
  }, [isVerified, captchaLoading]);

  const handleCaptchaError = () => {
    if (!isVerified && !captchaLoading) {
      setErrorMessage("reCAPTCHA verification failed. Please try again.");
      return;
    }
    setErrorMessage(null);
  };

  const areInputsValid = ({ email, password }) => {
    if (!validator.isEmail(email)) {
      setErrorMessage("Please enter a valid email");
      return false;
    }

    const passwordOptions = {
      minLength: 6,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    };

    if (!validator.isStrongPassword(password, passwordOptions)) {
      setErrorMessage(
        "Please ensures that the password contains at least one uppercase letter, one number, and 6 characters long."
      );
      return false;
    }

    return true;
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { email, password } = {
      email: data.get("email"),
      password: data.get("password"),
    };

    if (!areInputsValid({ email, password })) return;

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

  if (captchaLoading || loginLoading) return <LoadingSpinner />;

  return (
    <PageLayout>
      <PageCard sx={{ marginTop: "1em" }}>
        <LoginLayout>
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
        </LoginLayout>
      </PageCard>
    </PageLayout>
  );
}
