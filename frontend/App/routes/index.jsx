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
import TutorialsTags from "/features/Tutorials/Tags";
import TutorialsTagsTag from "/features/Tutorials/Tags/Tag";

export default function RenderRoutes() {
  const renderRoutesRecursively = (routes) => {
    const result = [];
    const handler = (routes) => {
      routes.forEach((route) => {
        result.push(
          <Route key={route.path} path={route.path}>
            <Route index element={route.element} />
          </Route>
        );
        if (route.children) {
          handler(route.children);
        }
      });
    };
    handler(routes);
    return result;
  };
  return <Routes>{renderRoutesRecursively(routes)}</Routes>;
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
      {
        path: "/tutorials/tags",
        element: <TutorialsTags />,
        children: [
          { path: "/tutorials/tags/:slug", element: <TutorialsTagsTag /> },
        ],
      },
    ],
  },
];
