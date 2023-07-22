import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import AuthService from "../services/AuthService";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
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

  return (
    <div className="LoginPage">
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>Don&apos;t have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  );
}

export default LoginPage;
