import { Route, Routes } from "react-router-dom";
import IsPrivate from "./IsPrivate";
import IsAnon from "./IsAnon";
import Notification from "/features/Notification";
import Register from "/features/Register";
import Login from "/features/Login";
import Welcome from "/features/Welcome";
import GithubAuth from "/features/Login/GithubAuth";
import GoogleAuth from "/features/Login/GoogleAuth";
import Dashboard from "/features/Dashboard";
import Profile from "/features/Profile";
import EditProfilePage from "/features/Profile/EditProfilePage";
import Tutorials from "/features/Tutorials";
import TutorialsCreate from "/features/Tutorials/Create";
import Tutorial from "/features/Tutorials/Tutorial";
import TutorialEdit from "/features/Tutorials/Tutorial/Edit";

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
    path: "/register",
    element: (
      <IsAnon>
        <Register />
      </IsAnon>
    ),
  },
  {
    path: "/login",
    element: (
      <IsAnon>
        <Login />
      </IsAnon>
    ),
    children: [
      {
        path: "/login/github",
        element: (
          <IsAnon>
            <GithubAuth />
          </IsAnon>
        ),
      },
      {
        path: "/login/google",
        element: (
          <IsAnon>
            <GoogleAuth />
          </IsAnon>
        ),
      },
    ],
  },
  {
    path: "/notification",
    element: (
      <IsAnon>
        <Notification />
      </IsAnon>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <IsPrivate>
        <Dashboard />
      </IsPrivate>
    ),
  },
  {
    path: "/profile",
    element: (
      <IsPrivate>
        <Profile />
      </IsPrivate>
    ),
    children: [
      {
        path: "/profile/edit",
        element: (
          <IsPrivate>
            <EditProfilePage />
          </IsPrivate>
        ),
      },
    ],
  },
  {
    path: "/tutorials",
    element: <Tutorials />,
    children: [
      {
        path: "/tutorials/:slug",
        element: <Tutorial />,
      },
      {
        path: "/tutorials/:slug/edit",
        element: (
          <IsPrivate>
            <TutorialEdit />
          </IsPrivate>
        ),
      },
      {
        path: "/tutorials/create",
        element: (
          <IsPrivate>
            <TutorialsCreate />
          </IsPrivate>
        ),
      },
    ],
  },
];