import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import QuickFiltersGrid from "./QuickFiltersGrid";
import SearchInput from "./SearchInput";

export default function SearchFilterBars() {
  return (
    <Box sx={{ flexGrow: 1, width: "100%", position: "fixed" }}>
      <AppBar position="static">
        <Toolbar>
          <QuickFiltersGrid
            fields={["title", "rating", "views", "popularity"]}
          />
          <SearchInput />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
