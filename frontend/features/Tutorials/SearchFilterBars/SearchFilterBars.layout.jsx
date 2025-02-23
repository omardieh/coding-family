import { AppBar, Box, Toolbar } from "@mui/material";
import React from "react";

export default function SearchFilterBarsLayout({ top, children }) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        position: "fixed",
        zIndex: 1,
        top: top || "inherit",
      }}
    >
      <AppBar
        position="static"
        sx={{
          background: (theme) => theme.colors.black.light,
          zIndex: 1,
          padding: "1em 0",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexDirection: {
              xs: "column",
              sm: "inline-flex",
              md: "row",
              lg: "row",
            },
          }}
        >
          {children}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
