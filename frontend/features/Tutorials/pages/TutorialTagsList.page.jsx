import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useTutorialsHook } from "../hooks";
import { TagCard, SearchFilterTagsBar } from "../components";
import { LoadingSpinner } from "/common/components";
import { useErrorContext } from "../../error-boundaries/context";

export function TutorialTagsList() {
  const { getTutorialsTags } = useTutorialsHook();
  const { data, isLoading, error } = getTutorialsTags();
  const { handleError } = useErrorContext();

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    handleError(error);
    return <Navigate to="/error" />;
  }

  const { data: tags } = data;

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1400px",
          height: "calc(100% - 4em)",
          position: "relative",
          top: "4em",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          padding: "2em",
          backgroundColor: (theme) => theme.colors.white.light,
        }}
      >
        <SearchFilterTagsBar />
        <Box
          sx={{
            background: (theme) => theme.colors.white.mid,
            margin: "auto",
            marginTop: "6em",
            maxWidth: "1600px",
            padding: "2em",
            borderRadius: "14px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            transition: "box-shadow 0.3s ease",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {tags?.map((tag) => (
            <TagCard key={tag._id} tag={tag} />
          ))}
        </Box>
      </Box>
    </>
  );
}
