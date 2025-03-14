import { Box, Button, Chip, Typography } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useTutorialsHook from "../hook";
import { useAuthContext } from "/features/Auth/context";
import { LoadingSpinner, PageLayout, PageCard } from "/common/components";

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

  if (loading || !tutorial) return <LoadingSpinner />;
  const isOwner =
    JSON.stringify(tutorial.author._id) === JSON.stringify(user?._id);
  return (
    <PageLayout sx={{ top: "1em" }}>
      <PageCard>
        <Box>
          <Box style={{ padding: "2em" }}>
            <Typography
              variant="h4"
              style={{ textAlign: "center", marginBottom: "1em" }}
            >
              {tutorial.title}
            </Typography>
            <Typography variant="subtitle2">{tutorial.description}</Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                listStyle: "none",
                margin: "1em 0",
                columnGap: ".5em",
                rowGap: ".5em",
                padding: ".5em",
                borderRadius: "14px",
                border: "1px solid #ccc",
              }}
              component="fieldset"
            >
              <legend style={{ padding: "0 1em" }}> Tags </legend>
              {tutorial.tags?.map(({ _id, label, slug }) => (
                <React.Fragment key={_id}>
                  <Link to={"/tutorials/tags/" + slug}>
                    <Chip
                      sx={{ padding: "1.5em", cursor: "pointer" }}
                      icon={null}
                      label={label}
                    />
                  </Link>
                </React.Fragment>
              ))}
            </Box>
            <Typography variant="subtitle2">
              {new Date(tutorial.createdAt).toDateString()}
            </Typography>
            <Typography variant="subtitle2">
              {tutorial.isPublic ? "Published" : "Draft"}
            </Typography>
            <Typography variant="subtitle2">
              <b>by:</b> {tutorial.author.username}
            </Typography>
            <Typography variant="subtitle2">
              <b>Read Time:</b> {tutorial.estimatedReadingTime} min
            </Typography>
            {isOwner && (
              <Link
                style={{ width: "100%" }}
                to={`/tutorials/${tutorial.slug}/edit`}
              >
                <Button sx={{ width: "100%", marginTop: ".5em" }}>
                  Edit Tutorial
                </Button>
              </Link>
            )}
          </Box>

          <MDEditor.Markdown
            source={tutorial.content}
            style={{
              whiteSpace: "pre-wrap",
              padding: "1em",
              width: "100%",
              marginTop: ".5em",
            }}
          />
        </Box>
      </PageCard>
    </PageLayout>
  );
}
