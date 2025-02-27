import { Box } from "@mui/material";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchFilterBars from "./SearchFilterBars";
import TutorialCard from "./TutorialCard";
import { useTutorialsContext } from "./context";
import useTutorialsHook from "./hook";
import classes from "./index.module.css";
import "./styles.css";
import Loading from "/features/Loading";

export default function Tutorials() {
  const { data, error, loading, getAllTutorials } = useTutorialsHook();
  const { quickFilter } = useTutorialsContext();
  const [searchParams] = useSearchParams();

  const [field, sort, page, per_page] = [
    searchParams.get("field") || quickFilter.field,
    searchParams.get("sort") || quickFilter.sort,
    searchParams.get("page") || quickFilter.page,
    searchParams.get("per_page") || quickFilter.per_page,
  ];

  useEffect(() => {
    getAllTutorials({
      ...(field && { field: field }),
      ...(sort && { sort: sort }),
      ...(page && { page: page }),
      ...(per_page && { per_page: per_page }),
    });
  }, [field, sort, page, per_page]);

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
        {!data?.tutorials || loading ? (
          <Loading />
        ) : (
          <Box
            sx={{
              background: (theme) => theme.colors.white.mid,
              margin: "auto",
              marginTop: "6em",
              maxWidth: "1200px",
              width: "90%",
              padding: "2em",
              borderRadius: "14px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "box-shadow 0.3s ease",
            }}
          >
            {data.tutorials?.map((tutorial) => (
              <TutorialCard key={tutorial._id} tutorial={tutorial} />
            ))}
          </Box>
        )}
      </Box>
    </>
  );
}
