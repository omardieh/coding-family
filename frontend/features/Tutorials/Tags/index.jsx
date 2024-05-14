import { Box } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useTutorialsHook from "/features/Tutorials/hook";

export default function TutorialsTags() {
  const { data: tags, error, loading, getTutorialsTags } = useTutorialsHook();

  useEffect(() => {
    getTutorialsTags();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        top: "4em",
      }}
    >
      {tags?.map((tag) => (
        <Link key={tag.slug} to={`/tutorials/tags/${tag.slug}`}>
          {tag.label}
        </Link>
      ))}
    </Box>
  );
}
