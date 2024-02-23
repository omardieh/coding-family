import { Route, Routes } from "react-router-dom";
import EditProjectPage from "../pages/EditProjectPage";
import ProjectDetailsPage from "../pages/ProjectDetailsPage";
import Projects from "../pages/projects";
import Verification from "../pages/verification";
import IsPrivate from "./IsPrivate";
import IsAnon from "./IsAnon";
import Account from "../pages/account";
import Register from "../pages/account/Register";
import Login from "../pages/account/Login";
import Welcome from "./../pages";
import GithubAuth from "../pages/account/GithubAuth";
import GoogleAuth from "./../pages/account/GoogleAuth";
import Dashboard from "../pages/account/Dashboard";
import Chat from "../pages/chat";

export default function RenderRoutes() {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path}>
          <Route index element={route.element} />
          {route.children &&
            route.children.map((childRoute, childIndex) => (
              <Route
                key={childIndex}
                path={childRoute.path}
                element={childRoute.element}
              />
            ))}
        </Route>
      ))}
    </Routes>
  );
}

const routes = [
  { path: "/", element: <Welcome /> },
  {
    path: "/projects",
    element: (
      <IsPrivate>
        <Projects />
      </IsPrivate>
    ),
    children: [
      {
        path: "/projects/",
        element: (
          <IsPrivate>
            <ProjectDetailsPage />
          </IsPrivate>
        ),
      },
      {
        path: "/projects/edit/:projectId",
        element: (
          <IsPrivate>
            <EditProjectPage />
          </IsPrivate>
        ),
      },
    ],
  },
  {
    path: "/account",
    element: (
      <IsAnon>
        <Account />
      </IsAnon>
    ),
    children: [
      {
        path: "/account/register",
        element: (
          <IsAnon>
            <Register />
          </IsAnon>
        ),
      },
      {
        path: "/account/login",
        element: (
          <IsAnon>
            <Login />
          </IsAnon>
        ),
      },
      {
        path: "/account/github",
        element: (
          <IsAnon>
            <GithubAuth />
          </IsAnon>
        ),
      },
      {
        path: "/account/google",
        element: (
          <IsAnon>
            <GoogleAuth />
          </IsAnon>
        ),
      },
      {
        path: "/account/dashboard",
        element: (
          <IsPrivate>
            <Dashboard />
          </IsPrivate>
        ),
      },
    ],
  },
  { path: "/verification", element: <Verification /> },
  {
    path: "/chat",
    element: (
      <IsPrivate>
        <Chat />
      </IsPrivate>
    ),
  },
];
