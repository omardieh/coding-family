import { Button } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

export const NavLinkItem = ({ buttonStyles, anchorStyles, path, title }) => {
  const { pathname } = useLocation();
  return (
    <>
      <Button sx={{ color: "#fff", ...buttonStyles }}>
        <NavLink
          style={{
            all: "unset",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            textDecoration: `${pathname === path ? "underline" : "none"}`,
            ...anchorStyles,
          }}
          to={path}
        >
          {title}
        </NavLink>
      </Button>
    </>
  );
};
