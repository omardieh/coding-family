import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import { Fragment } from "react";
import { useTutorialsContext } from "./../context";

export default function QuickFiltersGrid({ fields }) {
  const { quickFilter, setQuickFilter } = useTutorialsContext();

  function handleFilterClick(field, currentField) {
    setQuickFilter((prevState) => ({
      ...prevState,
      ...(field !== currentField && { activeField: field }),
      isAscending: field === currentField ? !prevState.isAscending : true,
    }));
  }

  return (
    <Box sx={{ width: 1, display: "flex", flexWrap: "wrap", columnGap: "1em" }}>
      {fields.map(({ title, field }, index) => (
        <Fragment key={index + field}>
          <Box
            onClick={() => handleFilterClick(field, quickFilter.activeField)}
            component="span"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {quickFilter.activeField === field ? <b>{title}</b> : title}{" "}
            {quickFilter.activeField === field ? (
              quickFilter.isAscending ? (
                <KeyboardArrowDownIcon />
              ) : (
                <KeyboardArrowUpIcon />
              )
            ) : (
              ""
            )}
          </Box>
          {index !== fields.length - 1 && <span>|</span>}
        </Fragment>
      ))}
    </Box>
  );
}
