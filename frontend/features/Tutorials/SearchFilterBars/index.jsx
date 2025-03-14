import * as React from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTutorialsContext } from "../context";
import QuickFiltersGrid from "./QuickFiltersGrid";
import SearchInput from "./SearchInput";
import NavigateElements from "./NavigateElements";
import { tutorialsNavbarLinks } from "/common/assets/navLinks";
import SearchFilterBarsLayout from "./SearchFilterBars.layout";

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
    <SearchFilterBarsLayout top="4em">
      <QuickFiltersGrid
        fields={[
          { title: "alphabetically", field: "title" },
          { title: "rating", field: "rating" },
          { title: "views", field: "views" },
          { title: "date", field: "date" },
          { title: "popularity", field: "popularity" },
        ]}
      />
      <NavigateElements navbarLinks={tutorialsNavbarLinks} />
      <SearchInput />
    </SearchFilterBarsLayout>
  );
}
