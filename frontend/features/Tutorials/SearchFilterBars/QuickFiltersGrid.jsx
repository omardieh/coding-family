import Box from "@mui/material/Box";
import { useEffect } from "react";
import { useTutorialsContext } from "./../context";

export default function QuickFiltersGrid({ fields }) {
  const { quickFilter, setQuickFilter } = useTutorialsContext();
  useEffect(() => {
    setQuickFilter({ activeField: fields[0], isAscending: true });
  }, []);

  function handleFilterClick(field, currentField) {
    setQuickFilter((prevState) => ({
      ...prevState,
      ...(field !== currentField && { activeField: field }),
      isAscending: field === currentField ? !prevState.isAscending : true,
    }));
  }

  return (
    <Box
      sx={{ width: 1, display: "flex", flexWrap: "wrap", columnGap: ".5em" }}
    >
      {fields.map((field, index) => (
        <Box
          onClick={() => handleFilterClick(field, quickFilter.activeField)}
          component="span"
          key={index + field}
        >
          {quickFilter.activeField === field ? <b>{field}</b> : field}
        </Box>
      ))}
    </Box>
  );
}
