import { Route, Routes } from "react-router-dom";
import EditProjectPage from "../pages/EditProjectPage";
import ProjectDetailsPage from "../pages/ProjectDetailsPage";
import Dashboard from "../pages/dashboard";
import Projects from "../pages/projects";
import Verification from "../pages/verification";
import IsPrivate from "./IsPrivate";
import IsAnon from "./IsAnon";
import Account from "../pages/account";
import Register from "../pages/account/Register";
import Login from "../pages/account/Login";
import Welcome from "./../pages/index";

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
    path: "/account/",
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
    ],
  },
  { path: "/verification", element: <Verification /> },
  { path: "/dashboard", element: <Dashboard /> },
];
