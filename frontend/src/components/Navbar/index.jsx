import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import { useOuterClick } from "./../../hooks/useOuterClick";
import { breakpoints } from "./../../global/breakpoints";
import { colors } from "./../../global/colors";
import MobMenuIcon from "./MobMenuIcon";
import navLinks from "./navLinks.json";

export default function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const [ref, isMobMenu, setIsMobMenu] = useOuterClick(false);
  let navElements = JSON.parse(JSON.stringify(navLinks));

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

  const toggleMobMenu = () => {
    setIsMobMenu(!isMobMenu);
  };

  return (
    <NAV ref={ref}>
      <MobMenuIcon toggleMobMenu={toggleMobMenu} isMobMenu={isMobMenu} />
      <DIV $isMobMenu={isMobMenu.toString()}>
        {navElements.map(({ id, title, path }) => (
          <LINK key={id} to={path} onClick={() => handleLinkClick(path)}>
            {path === "/login" ? (isLoggedIn ? "Logout" : title) : title}
          </LINK>
        ))}
      </DIV>
    </NAV>
  );
}

const { mob, tab, lap, des } = breakpoints;

const NAV = styled.nav`
  flex-basis: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media ${mob}, ${tab} {
    flex-direction: column;
    z-index: 1;
    width: 100%;
    justify-content: center;
    align-items: flex-end;
    position: absolute;
  }
`;

const DIV = styled.div`
  @media ${mob}, ${tab} {
    flex-direction: column;
    transform: ${(props) =>
      props.$isMobMenu === "true" ? "translateY(0)" : "translateY(-130%)"};
    transition: all 0.5s ease-in-out;
  }
  @media ${lap}, ${des} {
    justify-content: flex-end;
    padding-right: 1em;
    column-gap: 0.5em;
  }
  display: flex;
  width: 100%;
`;

const LINK = styled(NavLink)`
  @media ${mob}, ${tab} {
    height: 4rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  display: inline-block;
  text-decoration: none;
  color: ${colors.white};
  background-color: ${colors.blackDark};
  padding: 0.5em;

  &.active {
    background: ${colors.blackDark};
    border-radius: 3px;
    border: 1px solid ${colors.neonYellow};
    color: ${colors.neonYellow};
    box-shadow: 0 0 3px ${colors.neonYellow}, 0 0 3px ${colors.neonYellow} inset;
  }
`;
