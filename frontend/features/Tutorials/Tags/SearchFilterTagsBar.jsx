import React from "react";
import SearchFilterBarsLayout from "./../SearchFilterBars/SearchFilterBars.layout";
import { tutorialsTagsNavbarLinks } from "/common/assets/navLinks";
import QuickFiltersGrid from "./../SearchFilterBars/QuickFiltersGrid";
import NavigateElements from "./../SearchFilterBars/NavigateElements";
import SearchInput from "./../SearchFilterBars/SearchInput";

export default function SearchFilterTagsBar() {
  return (
    <SearchFilterBarsLayout top="64px">
      <QuickFiltersGrid
        fields={[
          { title: "alphabetically", field: "label" },
          { title: "tutorials count", field: "tutorials-count" },
        ]}
      />
      <NavigateElements navbarLinks={tutorialsTagsNavbarLinks} />
      <SearchInput />
    </SearchFilterBarsLayout>
  );
}
