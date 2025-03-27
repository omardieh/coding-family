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

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    const newFilters = {
      field: params.field || quickFilter.field,
      sort: params.sort || quickFilter.sort,
      page: params.page || quickFilter.page,
      per_page: params.per_page || quickFilter.per_page,
    };
    if (JSON.stringify(newFilters) !== JSON.stringify(quickFilter)) {
      setQuickFilter(newFilters);
      if (!params.field || !params.sort || !params.page || !params.per_page) {
        setSearchParams(newFilters, { replace: true });
      }
    }
  }, [searchParams]);

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
