import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm, AuthFormLayout } from "/features/Auth/components";
import { PageLayout, PageCard, LoadingSpinner } from "/common/components";
import { validateFormInputs } from "/features/Auth/handlers";
import { useAuth } from "/features/Auth/hooks";

export function Register() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    data: registerResponse,
    loading: registerLoading,
    error: registerError,
    signUserUp,
  } = useAuth();

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { username, email, password, passRepeat } = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      passRepeat: data.get("passRepeat"),
    };

    if (
      !validateFormInputs({
        username,
        email,
        password,
        passRepeat,
        setErrorMessage,
        isNewAccount: true,
      })
    )
      return;

    try {
      await signUserUp({ username, email, password });
      // if (!registerError) navigate("/login");
    } catch (error) {
      setErrorMessage(JSON.stringify(error));
    }
  };

  if (registerLoading) return <LoadingSpinner />;

  return (
    <PageLayout>
      <PageCard sx={{ marginTop: "1em" }}>
        <AuthFormLayout isNewAccount>
          <>
            <RegisterForm
              handleSubmit={handleRegisterSubmit}
              errorMessage={errorMessage || registerError}
            />
          </>
        </AuthFormLayout>
      </PageCard>
    </PageLayout>
  );
}
