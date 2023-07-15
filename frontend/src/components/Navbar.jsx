import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  let navElements = [
    { title: "Home", path: "/" },
    { title: "Projects", path: "/projects" },
    { title: "Signup", path: "/signup" },
    { title: "Login", path: "/login" },
  ];

  if (isLoggedIn) {
    navElements = navElements.filter((e) => e.path !== "/signup");
  }

  return (
    <nav>
      {navElements.map((e, i) => {
        return (
          <Link key={i + e.title} to={e.path}>
            <button
              onClick={
                e.path === "/login" && isLoggedIn ? logOutUser : undefined
              }
            >
              {e.path === "/login"
                ? isLoggedIn
                  ? "Logout"
                  : e.title
                : e.title}
            </button>
          </Link>
        );
      })}
      {isLoggedIn && <span> Welcome {user.name} </span>}
    </nav>
  );
}

export default Navbar;
