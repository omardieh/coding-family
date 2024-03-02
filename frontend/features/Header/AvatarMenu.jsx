import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function AvatarMenu({ navLinks, handleClick }) {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }} style={{ marginLeft: "1em" }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {navLinks.map(({ id, title, path, logout }) => (
          <NavLink
            key={id}
            to={path}
            style={{ all: "unset" }}
            onClick={handleCloseUserMenu}
          >
            <MenuItem onClick={logout ? handleClick : undefined}>
              <Typography textAlign="center">{title}</Typography>
            </MenuItem>
          </NavLink>
        ))}
      </Menu>
    </Box>
  );
}

export default AvatarMenu;
