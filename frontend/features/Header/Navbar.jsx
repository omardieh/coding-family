import { NavLink } from "react-router-dom";
import { useAuthContext } from "/common/contexts/AuthContext";
import { breakpoints } from "/common/assets/breakpoints";
import { colors } from "/common/assets/colors";

export default function Navbar({ navLinks }) {
  const { isLoggedIn, logOutUser } = useAuthContext();

  return (
    <nav>
      <div>
        {navLinks.map(({ id, title, path }) => (
          <NavLink key={id} to={path}>
            {path === "/account" ? (isLoggedIn ? "Logout" : title) : title}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

const { mob, tab, lap, des } = breakpoints;
