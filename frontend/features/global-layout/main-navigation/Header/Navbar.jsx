import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import MobSideMenu from "./MobSideMenu";
import { NavLinkItem } from "/common/components";

export default function Navbar({ navLinks, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = "55%";
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        color: (theme) => theme.colors.black.dark + "!important",
        "& *": {
          color: (theme) => theme.colors.black.dark + "!important",
        },
      }}
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 3, display: { sm: "none" } }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" component="div">
        Site Logo
      </Typography>
      <Box sx={{ display: { xs: "none", sm: "inline-flex" } }}>
        {navLinks.map(({ id, ...rest }) => (
          <NavLinkItem key={id} {...rest} />
        ))}
      </Box>
      {children}
      <MobSideMenu
        handleDrawerToggle={handleDrawerToggle}
        navLinks={navLinks}
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
      />
    </Box>
  );
}
