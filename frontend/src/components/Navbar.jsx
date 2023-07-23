import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { styled } from "styled-components";
import { colors } from "../global/colors";
import { breakpoints } from "../global/breakpoints";
import { useOuterClick } from "./../hooks/useOuterClick";

export default function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const [ref, isMobMenu, setIsMobMenu] = useOuterClick(false);

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
      <I
        onClick={() => setIsMobMenu(!isMobMenu)}
        className={isMobMenu ? "open" : ""}
      >
        <BURGER_MENU />
        <BURGER_MENU />
        <BURGER_MENU />
        <BURGER_MENU />
      </I>
      {navElements.map(({ id, title, path }) => (
        <LINK
          key={id}
          to={path}
          onClick={() => handleLinkClick(path)}
          ismobmenu={isMobMenu.toString()}
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
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: ${(props) =>
      props.ismobmenu === "true" ? "visible" : "hidden"};
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

const I = styled.i`
  @media ${mob}, ${tab} {
    display: block;
    width: 3rem;
    height: 3rem;
    margin: 0.5rem 0;
    position: relative;
    transform: rotate(0deg);
    transition: 0.5s ease-in-out;
    cursor: pointer;
    right: -40%;

    &.open span:nth-child(1) {
      top: 18px;
      width: 0%;
      left: 50%;
    }

    &.open span:nth-child(2) {
      transform: rotate(45deg);
    }

    &.open span:nth-child(3) {
      transform: rotate(-45deg);
    }

    &.open span:nth-child(4) {
      top: 18px;
      width: 0%;
      left: 50%;
    }
    transform: scale(0.8);
  }
  display: none;
`;

const BURGER_MENU = styled.span`
  @media ${mob}, ${tab} {
    display: block;
    position: absolute;
    height: 9px;
    width: 100%;
    background: ${colors.white};
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;

    &:nth-child(1) {
      top: 0px;
    }

    &:nth-child(2),
    &:nth-child(3) {
      top: 18px;
    }

    &:nth-child(4) {
      top: 36px;
    }
  }
`;
