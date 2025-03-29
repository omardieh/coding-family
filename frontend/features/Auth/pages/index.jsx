import { Login } from "./Login.pages";
import { LoginGithub } from "./LoginGithub.pages";
import { LoginGoogle } from "./LoginGoogle.pages";
import { Register } from "./Register.pages";
import { Logout } from "./Logout.pages";
import { VerifyEmail } from "./VerifyEmail.pages";

export default [
  {
    path: "/register",
    element: <Register />,
    scope: "guest",
  },
  {
    path: "/login",
    element: <Login />,
    scope: "guest",
    children: [
      {
        path: "/login/github",
        element: <LoginGithub />,
        scope: "guest",
      },
      {
        path: "/login/google",
        element: <LoginGoogle />,
        scope: "guest",
      },
    ],
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/email/verify",
    element: <VerifyEmail />,
    scope: "guest",
  },
];
