import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { Form, Input } from "../../components/Forms";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passRepeat, setPassRepeat] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handlePassRepeat = (e) => setPassRepeat(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);

  const handleSignupSubmit = () => {
    const requestBody = { email, password, username };
    AuthService.signup(requestBody)
      .then((response) => {
        if (response.status === 200) {
          navigate("/account/login");
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
      });
  };

  return (
    <>
      <Form
        title="Sign Up"
        onSubmit={handleSignupSubmit}
        onSubmitLabel="Sign Up"
        error={errorMessage}
      >
        <Input
          type="username"
          name="username"
          label="username: "
          placeholder="john_doe"
          value={username}
          onChange={handleUsername}
        />
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
          $background="rgba(53, 245, 5, 0.1)"
        />
        <Input
          type="password"
          name="passRepeat"
          label="repeat password: "
          placeholder="******"
          value={passRepeat}
          onChange={handlePassRepeat}
          $background="rgba(53, 245, 5, 0.1)"
        />
      </Form>
      <p>
        Already have account? <Link to={"/account/login"}>Login Here</Link>
      </p>
      <Outlet />
    </>
  );
}
