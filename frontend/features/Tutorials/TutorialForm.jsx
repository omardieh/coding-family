import { useState } from "react";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { useAuthContext } from "/common/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function TutorialForm(props) {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [title, setTitle] = useState(props.title || "");
  const [description, setDescription] = useState(props.description || "");
  const [tags, setTags] = useState(props.tags || []);
  const [content, setContent] = useState(props.content || "**Hello world!!!**");
  const [isPublic, setIsPublic] = useState(props.isPublic || true);
  const [errorMessage, setErrorMessage] = useState(props.errorMessage || null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.onSubmit) {
      if (!content || !title || !description || !tags || !isPublic) {
        setErrorMessage("All fields are required.");
        return;
      }
      if (title.length > 100) {
        setErrorMessage("Title must be at most 100 characters.");
        return;
      }
      if (description.length > 500) {
        setErrorMessage("Description must be at most 500 characters.");
        return;
      }
      if (content.length > 50000) {
        setErrorMessage("Content must be at most 50,000 characters.");
        return;
      }
      props.onSubmit({
        authorID: user._id,
        content,
        title,
        description,
        tags,
        isPublic,
      });
    }
  };
  console.log("props", props.errorMessage);
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
        {props.headingTitle}
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
      <Autocomplete
        style={{ margin: "1em 0" }}
        multiple
        id="tags-outlined"
        options={tags}
        value={tags}
        defaultValue={tags}
        freeSolo
        autoSelect
        filterSelectedOptions
        onChange={(_, newValue) => setTags(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Tags" placeholder="Tags" value={tags} />
        )}
      />
      <MDEditor
        style={{ width: "100%", minHeight: "70vh", marginTop: "2em" }}
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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          onClick={() => navigate(-1)}
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
        >
          Submit
        </Button>
      </Box>
      {(errorMessage || props.errorMessage) && (
        <Alert style={{ width: "100%", marginTop: "2em" }} severity="error">
          {errorMessage || props.errorMessage}
        </Alert>
      )}
    </Box>
  );
}
