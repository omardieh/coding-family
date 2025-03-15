import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm, AuthFormLayout } from "/features/Auth/components";
import { PageLayout, PageCard, LoadingSpinner } from "/common/components";
import { validateFormInputs } from "/features/Auth/handlers";
import { useAuth } from "/features/Auth/hooks";

export function Register() {
  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    email: "",
    password: "",
    passRepeat: "",
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    data: registerData,
    loading: registerLoading,
    error: registerError,
    signUserUp,
  } = useAuth();

  useEffect(() => {
    console.log(registerData);
    if (registerError) setErrorMessage(registerError);
    // if (!registerLoading && !registerError) navigate("/login");
    return () => {
      setErrorMessage(null);
    };
  }, [registerError, registerLoading, registerData]);

  const handleRegisterInput = ({ target: { name, value } }) =>
    setRegisterFormData({ ...registerFormData, [name]: value });

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    const { passRepeat, ...formData } = registerFormData;
    if (
      !validateFormInputs({
        ...formData,
        passRepeat,
        setErrorMessage,
        isNewAccount: true,
      })
    )
      return;

    try {
      await signUserUp(formData);
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
              registerFormData={registerFormData}
              handleRegisterInput={handleRegisterInput}
              handleRegisterSubmit={handleRegisterSubmit}
              errorMessage={errorMessage || registerError}
            />
          </>
        </AuthFormLayout>
      </PageCard>
    </PageLayout>
  );
}
