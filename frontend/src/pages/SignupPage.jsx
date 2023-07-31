import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { Form, Input } from "../components/Forms";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passRepeat, setPassRepeat] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handlePassRepeat = (e) => setPassRepeat(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, username };
    AuthService.signup(requestBody)
      .then((response) => {
        localStorage.setItem(
          "emailVerifyToken",
          response.data.emailVerifyToken
        );
        navigate("/login");
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
      });
  };

  return (
    <>
      <Form
        title="Sign Up"
        handleSubmit={handleSignupSubmit}
        onSubmitLabel="Sign Up"
        errorMessage={errorMessage}
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
        />
        <Input
          type="password"
          name="passRepeat"
          label="repeat password: "
          placeholder="******"
          value={passRepeat}
          onChange={handlePassRepeat}
        />
      </Form>
      <p>
        Already have account? <Link to={"/login"}>Login Here</Link>
      </p>
      {/* <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsername}
        />
        <button type="submit">Sign Up</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link> */}
    </>
  );
}

export default SignupPage;
