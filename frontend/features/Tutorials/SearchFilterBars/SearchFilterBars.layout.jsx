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
        top: top || "initial",
      }}
    >
      <AppBar
        position="static"
        className="AppBar"
        sx={{
          background: (theme) => theme.colors.black.light,
          zIndex: 1,
          padding: "1em 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "space-between",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            flexDirection: {
              xs: "column",
              sm: "inline-flex",
              md: "row",
              lg: "row",
            },
            "& > div": {
              margin: "auto",
            },
          }}
        >
          {children}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
