import SearchFilterBarsLayout from "/features/Tutorials/components/SearchFilterBars/SearchFilterBars.layout";
import { tutorialsTagsNavbarLinks } from "/common/assets/navLinks";
import QuickFiltersGrid from "/features/Tutorials/components/SearchFilterBars/QuickFiltersGrid";
import NavigateElements from "/features/Tutorials/components/SearchFilterBars/NavigateElements";
import SearchInput from "/features/Tutorials/components/SearchFilterBars/SearchInput";

export function SearchFilterTagsBar() {
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
