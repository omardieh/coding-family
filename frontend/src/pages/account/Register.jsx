import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
// import { Form, Input } from "../../components/Forms";
import { CARD } from "../../global/elements";

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
      <h2>Welcome to our Community!</h2>
      {/* <CARD $justifyContent="center">
        <Form
          $flexBasis="85%"
          title="Happy to have a new member in the fam!"
          description="Give us a holler by filling in the details below!"
          onSubmit={handleSignupSubmit}
          onSubmitLabel="Sign Up"
          error={errorMessage}
          linkText="Already have account?"
          linkUnderlined="Login Here"
          linkPath="/account/login"
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

        <Outlet />
      </CARD> */}
    </>
  );
}
