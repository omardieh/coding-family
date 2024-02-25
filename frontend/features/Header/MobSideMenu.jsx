import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";

function MobSideMenu({
  navLinks,
  window,
  drawerWidth,
  mobileOpen,
  handleDrawerToggle,
}) {
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Drawer
      container={container}
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
    >
      <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
        <Link style={{ all: "unset", cursor: "pointer" }} to="/">
          <Typography variant="h6" sx={{ my: 2 }}>
            Site Logo
          </Typography>
        </Link>
        <Divider />
        <List>
          {navLinks.map(({ id, title, path }) => (
            <ListItem key={id} disablePadding>
              <NavLink to={path} style={{ all: "unset" }}>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary={title} />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default MobSideMenu;
