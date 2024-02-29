import { Link, useParams } from "react-router-dom";
import useTutorialsHook from "../hook";
import Loading from "/features/Loading";
import { useEffect } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import MDEditor from "@uiw/react-md-editor";
import { useAuthContext } from "/common/contexts/AuthContext";

export default function Tutorial() {
  const { slug } = useParams();
  const { user } = useAuthContext();
  const {
    data: tutorial,
    error,
    loading,
    getTutorialBySlug,
  } = useTutorialsHook();

  useEffect(() => {
    getTutorialBySlug(slug);
  }, []);

  if (loading || !tutorial) return <Loading />;
  const isOwner = JSON.stringify(tutorial.author) === JSON.stringify(user._id);

  return (
    <Box
      sx={{
        background: "white",
        padding: "2em 0",
        width: "100%",
        maxWidth: "1200px",
      }}
    >
      <Box style={{ padding: "2em" }}>
        <Typography
          variant="h4"
          style={{ textAlign: "center", marginBottom: "1em" }}
        >
          {tutorial.title}
        </Typography>
        <Typography variant="subtitle2">{tutorial.description}</Typography>
        <Typography variant="subtitle1">
          {tutorial.tags.map((tag) => tag)}
        </Typography>
        <Typography variant="subtitle2">
          {new Date(tutorial.createdAt).toDateString()}
        </Typography>
        <Typography variant="subtitle2">
          {tutorial.isPublic ? "Published" : "Draft"}
        </Typography>
      </Box>

      <MDEditor.Markdown
        source={tutorial.content}
        style={{
          whiteSpace: "pre-wrap",
          padding: "1em",
          width: "100%",
        }}
      />
      {isOwner && (
        <Link to={`/tutorials/${tutorial.slug}/edit`}>
          <Button>Edit Tutorial</Button>
        </Link>
      )}
    </Box>
  );
}
