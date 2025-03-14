import React from "react";
import { Box, Button } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { NavLinkItem } from "/common/components";

export default function NavigateElements({ navbarLinks }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        alignContent: "center",
        color: (theme) => theme.colors.white.dark + "!important",
        "& *": {
          color: (theme) => theme.colors.white.dark + "!important",
        },
      }}
    >
      <Box sx={{ display: { sm: "inline-flex", lg: "flex" }, margin: "0 1em" }}>
        {navbarLinks.map(({ id, ...rest }) => (
          <NavLinkItem key={id} {...rest} />
        ))}
      </Box>
    </Box>
  );
}
