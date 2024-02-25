import { NavLink } from "react-router-dom";
import { Box } from "@mui/material";
import { useState } from "react";
import { Button, CssBaseline, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MobSideMenu from "./MobSideMenu";

export default function Navbar({ navLinks, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = "55%";
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <>
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 3, display: { sm: "none" } }}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
      >
        Site Logo
      </Typography>
      <Box sx={{ display: { xs: "none", sm: "inline-flex" } }}>
        {navLinks.map(({ id, title, path }) => (
          <Button key={id} sx={{ color: "#fff" }}>
            <NavLink style={{ all: "unset" }} to={path}>
              {title}
            </NavLink>
          </Button>
        ))}
      </Box>
      {children}
      <MobSideMenu
        handleDrawerToggle={handleDrawerToggle}
        navLinks={navLinks}
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
      />
    </>
  );
}
