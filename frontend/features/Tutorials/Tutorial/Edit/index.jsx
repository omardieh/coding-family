import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "/common/contexts/AuthContext";
import useTutorialsHook from "/features/Tutorials/hook";
import Loading from "/features/Loading";
import { Box, Button, Switch, TextField, Typography } from "@material-ui/core";
import MDEditor from "@uiw/react-md-editor";

export default function TutorialEdit() {
  const { slug } = useParams();
  const { user } = useAuthContext();
  const {
    data: tutorial,
    error,
    loading,
    getTutorialBySlug,
  } = useTutorialsHook();
  const {
    data: updatedTutorial,
    error: updatedError,
    loading: updatedLoading,
    updateTutorialBySlug,
  } = useTutorialsHook();

  const [content, setContent] = useState("**Hello world!!!**");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [isPublic, setIsPublic] = useState(true);

  useEffect(() => {
    getTutorialBySlug(slug);
  }, []);

  useEffect(() => {
    if (tutorial) {
      const { content, title, description, tags, isPublic } = tutorial;
      setContent(content);
      setTitle(title);
      setDescription(description);
      setTags(tags);
      setIsPublic(isPublic);
    }
  }, [tutorial]);

  useEffect(() => {
    if (updatedTutorial) {
      const { content, title, description, tags, isPublic } = updatedTutorial;
      setContent(content);
      setTitle(title);
      setDescription(description);
      setTags(tags);
      setIsPublic(isPublic);
    }
  }, [updatedTutorial]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqBody = {
      authorID: user._id,
      title,
      description,
      tags: tags.length ? tags.split(",") : [],
      content,
      isPublic,
    };
    updateTutorialBySlug(slug, reqBody);
  };

  if (loading || updatedLoading || !tutorial) return <Loading />;
  const isOwner = JSON.stringify(tutorial.author) === JSON.stringify(user._id);

  console.log(tutorial, updatedTutorial);

  return (
    <Box
      sx={{
        background: "white",
        padding: "2em",
        width: "100%",
        maxWidth: "1200px",
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography
        variant="h6"
        style={{ textAlign: "center", marginBottom: "1em" }}
      >
        Edit Tutorial
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        minRows={4}
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Tags"
        variant="outlined"
        fullWidth
        margin="normal"
        value={tags}
        onChange={({ target: { value } }) => setTags(value)}
      />
      <MDEditor
        style={{ width: "100%", minHeight: "50vh", marginTop: "2em" }}
        value={content}
        onChange={setContent}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "1em",
        }}
      >
        <Typography variant="body1" style={{ marginRight: "1em" }}>
          Publish:
        </Typography>
        <Switch checked={isPublic} onChange={() => setIsPublic(!isPublic)} />
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: "16px" }}
      >
        Save Changes
      </Button>
    </Box>
  );
}
