import { Box } from "@mui/material";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useTutorialsHook from "/features/Tutorials/hook";
import classes from "/features/Tutorials/index.module.css";

export default function TutorialsTagsTag() {
  const { slug } = useParams();

  const { data: tag, error, loading, getTutorialsByTag } = useTutorialsHook();

  useEffect(() => {
    getTutorialsByTag(slug);
  }, []);

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
