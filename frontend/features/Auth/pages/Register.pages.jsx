import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm, AuthFormLayout } from "/features/Auth/components";
import { PageLayout, PageCard, LoadingSpinner } from "/common/components";
import { validateFormInputs } from "/features/Auth/handlers";
import { useCaptchaContext } from "/features/Auth/context";
import { useAuth } from "/features/Auth/hooks";

export function Register() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const { isVerified, isLoading: captchaLoading } = useCaptchaContext();
  const {
    loading: registerLoading,
    error: registerError,
    signUserUp,
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

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { username, email, password, passRepeat } = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      passRepeat: data.get("passRepeat"),
    };

    if (!validateFormInputs({ email, password, passRepeat, setErrorMessage }))
      return;

    try {
      await signUserUp({ username, email, password });
      navigate("/login");
    } catch (_) {
      setErrorMessage(registerError);
    }
  };

  if (captchaLoading || registerLoading) return <LoadingSpinner />;

  return (
    <PageLayout>
      <PageCard sx={{ marginTop: "1em" }}>
        <AuthFormLayout isNewAccount>
          <>
            <RegisterForm
              handleSubmit={handleRegisterSubmit}
              errorMessage={errorMessage}
            />
          </>
        </AuthFormLayout>
      </PageCard>
    </PageLayout>
  );
}
