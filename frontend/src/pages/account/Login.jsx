import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AuthService from "../../services/AuthService";
import { Input } from "./../../components/Forms";
import { Form } from "../../components/Forms";
import Button from "../../components/Button";
import { FaPlus, FaTrash, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = () => {
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
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${
      import.meta.env.VITE_GITHUB_CLIENT_ID
    }&redirect_uri=${import.meta.env.VITE_GITHUB_REDIRECT_URI}&scope=read:user`;
  };

  const handleLoginGoogle = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/google`;
  };

  return (
    <>
      <Form
        title="Hey there! Let's get you started 😄"
        description="To begin, just drop in your email and password, or login with the power of your Google or GitHub account! 🚀"
        onSubmit={handleLoginSubmit}
        onSubmitLabel="Login"
        error={errorMessage}
      >
        <Input
          type="email"
          name="email"
          label="email: "
          placeholder="address@example.com"
          value={email}
          onChange={handleEmail}
        />
        <Input
          type="password"
          name="password"
          label="password: "
          placeholder="******"
          value={password}
          onChange={handlePassword}
          enableShowPass
        />
        <b />

        <Button variant="primary" type="submit">
          Sign in using Email
        </Button>
      </Form>
      <div>
        <Button onClick={handleLoginGoogle} variant="light" icon={<FcGoogle />}>
          Sign in with Google
        </Button>
        <Button onClick={handleLoginGithub} variant="dark" icon={<FaGithub />}>
          Sign in with Github
        </Button>
      </div>

      <p>
        Don&apos;t have an account yet?{" "}
        <Link to={"/account/register"}> Sign Up Here</Link>
      </p>
    </>
  );
}
