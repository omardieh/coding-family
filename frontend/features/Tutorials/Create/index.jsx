import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Box, Button, Switch, TextField, Typography } from "@material-ui/core";
import { useAuthContext } from "/common/contexts/AuthContext";
import useTutorialsHook from "../hook";

export default function TutorialsCreate() {
  const [content, setContent] = useState("**Hello world!!!**");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const {
    user: { _id },
  } = useAuthContext();
  const { data: response, postNewTutorial } = useTutorialsHook();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqBody = {
      authorID: _id,
      title,
      description,
      tags: tags.length ? tags.split(",") : [],
      content,
      isPublic,
    };
    postNewTutorial(reqBody);
  };
  console.log(response);
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
        Create New Tutorial
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
      {/* <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} /> */}
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
        Submit Tutorial
      </Button>
    </Box>
  );
}
