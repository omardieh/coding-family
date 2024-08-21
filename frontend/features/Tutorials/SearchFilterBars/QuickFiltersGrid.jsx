import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import { Fragment } from "react";
import { useSearchParams } from "react-router-dom";
import { useTutorialsContext } from "./../context";

export default function QuickFiltersGrid({ fields }) {
  const { quickFilter, setQuickFilter } = useTutorialsContext();
  const [, setSearchParams] = useSearchParams();

  function handleFilterClick(field) {
    setQuickFilter((prevState) => ({
      ...prevState,
      field,
      sort:
        field !== quickFilter.field
          ? "asc"
          : quickFilter.sort === "asc"
          ? "desc"
          : "asc",
    }));
    setSearchParams((params) => {
      params.set("field", field);
      params.set(
        "sort",
        field !== quickFilter.field
          ? "asc"
          : quickFilter.sort === "asc"
          ? "desc"
          : "asc"
      );
      return params;
    });
  }

  return (
    <Box sx={{ width: 1, display: "flex", flexWrap: "wrap", columnGap: "1em" }}>
      {fields.map(({ title, field }, index) => (
        <Fragment key={index + field}>
          <Box
            onClick={() => handleFilterClick(field)}
            component="span"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {quickFilter.field === field ? <b>{title}</b> : title}
            {quickFilter.field === field &&
              (quickFilter.sort === "asc" ? (
                <KeyboardArrowDownIcon />
              ) : (
                <KeyboardArrowUpIcon />
              ))}
          </Box>
          {index !== fields.length - 1 && <span>|</span>}
        </Fragment>
      ))}
    </Box>
  );
}
