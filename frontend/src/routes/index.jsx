import { Route, Routes } from "react-router-dom";
import EditProjectPage from "../pages/EditProjectPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProjectDetailsPage from "../pages/ProjectDetailsPage";
import SignupPage from "../pages/SignupPage";
import Dashboard from "../pages/dashboard";
import Projects from "../pages/projects";
import Verification from "../pages/verification";
import IsPrivate from "./IsPrivate";
import IsAnon from "./IsAnon";

export default function RenderRoutes() {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element}>
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
  { path: "/", element: <HomePage /> },
  {
    path: "/projects",
    element: (
      <IsPrivate>
        <Projects />
      </IsPrivate>
    ),
    children: [
      {
        path: "/projects",
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
    path: "/register",
    element: (
      <IsAnon>
        <SignupPage />
      </IsAnon>
    ),
  },
  {
    path: "/login",
    element: (
      <IsAnon>
        <LoginPage />
      </IsAnon>
    ),
  },
  { path: "/verification", element: <Verification /> },
  { path: "/dashboard", element: <Dashboard /> },
];
