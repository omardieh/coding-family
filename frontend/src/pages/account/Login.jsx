import { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AuthService from "../../services/AuthService";
import { Input } from "./../../components/Forms";
import { Form } from "../../components/Forms";

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

  const handleLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${
      import.meta.env.VITE_GITHUB_CLIENT_ID
    }&redirect_uri=${import.meta.env.VITE_GITHUB_REDIRECT_URI}&scope=read:user`;
  };

  return (
    <>
      <Form
        title="Login"
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
      </Form>
      <button onClick={handleLogin}>Login with GitHub</button>
      <p>
        Don&apos;t have an account yet?{" "}
        <Link to={"/account/register"}> Sign Up Here</Link>
      </p>
      <Outlet />
    </>
  );
}
