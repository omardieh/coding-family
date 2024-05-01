import { Box } from "@mui/material";
import { useEffect } from "react";
import SearchFilterBars from "./SearchFilterBars/index";
import TutorialCard from "./TutorialCard";
import { useTutorialsContext } from "./context";
import useTutorialsHook from "./hook";
import classes from "./index.module.css";
import "./styles.css";
import Loading from "/features/Loading";

export default function Tutorials() {
  const {
    data: tutorials,
    error,
    loading,
    getAllTutorials,
  } = useTutorialsHook();

  const {
    quickFilter: { activeField, isAscending },
  } = useTutorialsContext();

  useEffect(() => {
    getAllTutorials({
      filter: activeField,
      sort: isAscending ? "asc" : "desc",
    });
  }, [activeField, isAscending]);

  if (loading || !tutorials) return <Loading />;
  return (
    <>
      <Box
        sx={{
          width: "100%",
          position: "relative",
          top: "4em",
        }}
      >
        <SearchFilterBars />
        <Box
          className={classes.box}
          sx={{
            background: (theme) => theme.colors.white.mid,
            margin: "auto",
            marginTop: "6em",
            maxWidth: "1200px",
          }}
        >
          {tutorials?.map((tutorial) => (
            <TutorialCard key={tutorial._id} tutorial={tutorial} />
          ))}
        </Box>
      </Box>
    </>
  );
}
