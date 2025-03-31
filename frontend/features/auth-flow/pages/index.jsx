import { Login } from "./Login.page";
import { LoginGithub } from "./LoginGithub.page";
import { LoginGoogle } from "./LoginGoogle.page";
import { Register } from "./Register.page";
import { Logout } from "./Logout.page";
import { VerifyEmail } from "./VerifyEmail.page";

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
