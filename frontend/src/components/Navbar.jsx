import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { styled } from "styled-components";
import { colors } from "../global/colors";
import { breakpoints } from "../global/breakpoints";
import { useOuterClick } from "./../hooks/useOuterClick";

export default function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const [ref, isMobMenu, setIsMobMenu] = useOuterClick(true);

  let navElements = [
    { id: 1, title: "Welcome", path: "/" },
    { id: 2, title: "Projects", path: "/projects" },
    { id: 3, title: "Dashboard", path: "/dashboard" },
    { id: 4, title: "Login", path: "/login" },
    { id: 5, title: "Register", path: "/register" },
  ];

  if (isLoggedIn) {
    navElements = navElements.filter((e) => e.path !== "/register");
  }

  if (!isLoggedIn) {
    navElements = navElements.filter(
      (e) => e.path !== "/dashboard" && e.path !== "/projects"
    );
  }

  const handleLinkClick = (path) => {
    if (path === "/login") {
      if (isLoggedIn) {
        logOutUser();
      }
    }
    setIsMobMenu(false);
  };

  return (
    <NAV ref={ref}>
      <BUTTON onClick={() => setIsMobMenu(!isMobMenu)}>
        {isMobMenu ? "X" : "O"}
      </BUTTON>
      {navElements.map(({ id, title, path }) => (
        <LINK
          key={id}
          to={path}
          onClick={() => handleLinkClick(path)}
          isMobMenu={isMobMenu}
        >
          {path === "/login" ? (isLoggedIn ? "Logout" : title) : title}
        </LINK>
      ))}
    </NAV>
  );
}

const { mob, tab } = breakpoints;

const NAV = styled.nav`
  flex-basis: 60%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media ${mob}, ${tab} {
    flex-direction: column;
    z-index: 1;
    width: 100%;
    justify-content: center;
    align-items: center;
    position: absolute;
  }
`;

const LINK = styled(NavLink)`
  @media ${mob}, ${tab} {
    width: 100%;
    height: 5em;
    display: ${(props) => (props.isMobMenu ? "flex" : "none")};
    justify-content: center;
    align-items: center;
  }

  display: inline-block;
  text-decoration: none;
  color: ${colors.white};
  background-color: ${colors.blackDark};
  margin: 0 0.5em;
  padding: 0.3em 1em;

  &.active {
    color: ${colors.white};
    background: ${colors.blackDark};
    border-radius: 3px;
    padding: 0.5em 1em;
    border: 1px solid ${colors.neonYellow};
    color: ${colors.neonYellow};
    box-shadow: 0 0 3px ${colors.neonYellow}, 0 0 3px ${colors.neonYellow} inset;
  }
`;

const BUTTON = styled.button`
  @media ${mob}, ${tab} {
    height: 5em;
    display: flex;
    align-self: flex-end;
    align-items: center;
    background: ${colors.blackDark};
    color: ${colors.white};
    padding: 0.3em 2em;
    border: 1px solid ${colors.neonYellow};
    color: ${colors.neonYellow};
    box-shadow: 0 0 3px ${colors.neonYellow}, 0 0 3px ${colors.neonYellow} inset;
    cursor: pointer;
  }
  display: none;
`;
