import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTutorialsContext } from "../context";
import QuickFiltersGrid from "./QuickFiltersGrid";
import SearchInput from "./SearchInput";

export default function SearchFilterBars() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { quickFilter, setQuickFilter } = useTutorialsContext();

  const [field, sort, page, per_page] = [
    searchParams.get("field"),
    searchParams.get("sort"),
    searchParams.get("page"),
    searchParams.get("per_page"),
  ];

  useEffect(() => {
    setSearchParams((params) => {
      for (const filter in quickFilter) {
        if (quickFilter[filter]) params.set(filter, quickFilter[filter]);
      }
      return params;
    });
  }, [
    quickFilter.field,
    quickFilter.sort,
    quickFilter.page,
    quickFilter.per_page,
  ]);

  useEffect(() => {
    setQuickFilter((prev) => ({
      ...prev,
      ...(field && { field: field }),
      ...(sort && { sort: sort }),
      ...(page && { page: page }),
      ...(per_page && { per_page: per_page }),
    }));
  }, []);
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
              { title: "alphabetically", field: "title" },
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
