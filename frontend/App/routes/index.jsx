import { Route, Routes } from "react-router-dom";
import IsAnon from "./IsAnon";
import IsPrivate from "./IsPrivate";
import authPages from "../../features/auth-flow/pages";
import userPages from "../../features/user-section/pages";
import tutorialsPages from "../../features/tutorials/pages";
import { HomePage } from "../../features/landing-page/pages";
import { ErrorPage } from "../../features/error-boundaries/pages";

const routes = [
  { path: "/", element: <HomePage /> },
  {
    path: "/error",
    element: <ErrorPage />,
  },
  ...authPages,
  ...userPages,
  ...tutorialsPages,
];

export default function RenderRoutes() {
  const handleRouteBoundaries = ({ element, scope }) => {
    if (scope === "guest") return <IsAnon>{element}</IsAnon>;
    if (scope === "user") return <IsPrivate>{element}</IsPrivate>;
    return element;
  };

  const renderRoutesRecursively = (routes) => {
    const result = [];
    const handler = (routes) => {
      routes.forEach(({ element, path, scope, children }) => {
        result.push(
          <Route key={path} path={path}>
            <Route index element={handleRouteBoundaries({ element, scope })} />
          </Route>
        );
        if (children) {
          handler(children);
        }
      });
    };
    handler(routes);
    return result;
  };

  return <Routes>{renderRoutesRecursively(routes)}</Routes>;
}
