import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AuthService from "../../services/AuthService";
import { Input } from "./../../components/Forms";
import { Form } from "../../components/Forms";
import Button from "../../components/Button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { CARD, SEPARATOR } from "../../global/elements";
import { useCaptchaContext } from "../../contexts/CaptchaContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const { isVerified } = useCaptchaContext();

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = () => {
    if (!isVerified) {
      setErrorMessage("reCAPTCHA verification failed. Please try again.");
      return;
    }
    AuthService.login({ email, password })
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.response.data);
      });
  };

  const handleLoginGithub = () => {
    if (!isVerified) {
      setErrorMessage("reCAPTCHA verification failed. Please try again.");
      return;
    }
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/github`;
  };

  const handleLoginGoogle = () => {
    if (!isVerified) {
      setErrorMessage("reCAPTCHA verification failed. Please try again.");
      return;
    }
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/google`;
  };

  return (
    <>
      <h2>Login to your Account</h2>
      <CARD>
        <Form
          title="Let's get you started 🚀"
          description="To begin, just drop in your email and password"
          onSubmit={handleLoginSubmit}
          onSubmitLabel="Sign in using Email"
          error={errorMessage}
          linkText="Don't have an account yet? Please"
          linkUnderlined="Sign Up Here"
          linkPath="/account/register"
        >
          <Input
            type="email"
            name="email"
            label="email"
            placeholder="address@example.com"
            value={email}
            onChange={handleEmail}
          />
          <Input
            type="password"
            name="password"
            label="password"
            placeholder="******"
            value={password}
            onChange={handlePassword}
            enableShowPass
          />
          <b />
        </Form>
        <SEPARATOR />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "1em",
            justifyContent: "center",
            alignItems: "center",
            flexBasis: "45%",
            padding: "1em",
          }}
        >
          <p
            style={{ width: "100%", textAlign: "center", marginBottom: "1em" }}
          >
            Login using Google or Github account
          </p>
          <Button
            onClick={handleLoginGoogle}
            variant="light"
            icon={<FcGoogle />}
          >
            Sign in with Google
          </Button>
          <Button
            onClick={handleLoginGithub}
            variant="dark"
            icon={<FaGithub />}
          >
            Sign in with Github
          </Button>
        </div>
      </CARD>
    </>
  );
}
