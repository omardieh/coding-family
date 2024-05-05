import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import QuickFiltersGrid from "./QuickFiltersGrid";
import SearchInput from "./SearchInput";

export default function SearchFilterBars() {
  return (
    <Box sx={{ flexGrow: 1, width: "100%", position: "fixed" }}>
      <AppBar
        position="static"
        sx={{
          background: (theme) => theme.colors.black.light,
          zIndex: 1,
        }}
      >
        <Toolbar>
          <QuickFiltersGrid
            fields={[
              { title: "sort alphabetically", field: "title" },
              { title: "rating score", field: "rating" },
              { title: "views count", field: "views" },
              { title: "date created", field: "date" },
              { title: "popularity", field: "popularity" },
            ]}
          />
          <SearchInput />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
