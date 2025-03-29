import { Box } from "@mui/material";
import { Link, Navigate, useParams } from "react-router-dom";
import { useTutorialsHook } from "../hooks";
import { useErrorContext } from "../../error-boundaries/context";
import { LoadingSpinner } from "/common/components";

export function TutorialTagDetails() {
  const { slug } = useParams();
  const { getTutorialsByTag } = useTutorialsHook();
  const { data, isLoading, error } = getTutorialsByTag(slug);
  const { handleError } = useErrorContext();

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    handleError(error);
    return <Navigate to="/error" />;
  }

  const { data: tag } = data;

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          background: (theme) => theme.colors.white.mid,
          margin: "auto",
          marginTop: "6em",
          maxWidth: "1200px",
          width: "90%",
          padding: "2em",
          borderRadius: "14px",
          WebkitBorderRadius: "14px",
          MozBorderRadius: "14px",
          msBorderRadius: "14px",
          OBorderRadius: "14px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        {tag?.tutorials?.map((tutorial) => (
          <Link key={tutorial.slug} to={`/tutorials/${tutorial.slug}`}>
            {tutorial.title}
          </Link>
        ))}
      </Box>
    </Box>
  );
}
