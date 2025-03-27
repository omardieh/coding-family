import { Box } from "@mui/material";
import { Link, Navigate, useParams } from "react-router-dom";
import useTutorialsHook from "/features/Tutorials/hook";
import classes from "/features/Tutorials/index.module.css";
import { useErrorContext } from "/features/Error/context";
import { LoadingSpinner } from "/common/components";

export default function TutorialsTagsTag() {
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
        className={classes.box}
        sx={{
          background: (theme) => theme.colors.white.mid,
          margin: "auto",
          marginTop: "6em",
          maxWidth: "1200px",
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
