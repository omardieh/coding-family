import React from "react";
import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

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
      <Box sx={{ display: { sm: "inline-flex", lg: "flex" } }}>
        {navbarLinks.map(({ id, title, path }) => (
          <Button key={id} sx={{ color: "#fff" }}>
            <NavLink
              style={{
                all: "unset",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              to={path}
            >
              {title}
            </NavLink>
          </Button>
        ))}
      </Box>
    </Box>
  );
}
