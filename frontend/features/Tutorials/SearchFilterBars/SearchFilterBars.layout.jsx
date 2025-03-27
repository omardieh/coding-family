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
          padding: {
            xs: "1em 0px",
            sm: "1em 0px",
            md: "0px 0px",
            lg: "0px 0px",
          },
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
