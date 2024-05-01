import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import classes from "./TutorialCard.module.css";

const TutorialCardUserInfo = ({ tutorial }) => (
  <Box
    sx={{
      display: "flex",
      width: "20%",
      height: "100%",
      flexWrap: "wrap",
      padding: "2em",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "stretch",
    }}
  >
    <Avatar
      sx={{ margin: "auto", width: 24, height: 24 }}
      alt={tutorial.author.username}
      src={tutorial.author.avatar}
    />
    <Typography>{tutorial.author.username}</Typography>

    <Typography
      sx={{ flexBasis: "100%", width: "100%" }}
      variant="body2"
      color="textSecondary"
    >
      {new Date(tutorial.createdAt).toLocaleDateString()}
    </Typography>
  </Box>
);
const TutorialCardDetailLink = ({ tutorial }) => (
  <Link
    to={`/tutorials/${tutorial.slug}`}
    style={{ textDecoration: "none", display: "block", width: "80%" }}
  >
    <Box>
      <CardContent>
        <Typography className={classes.title} variant="h6">
          {tutorial.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {tutorial.description}
        </Typography>
        <br />
        <Box component="span">
          <Typography variant="body2" color="textSecondary">
            Reading Time: {tutorial.estimatedReadingTime} minutes
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Views Count: {tutorial.views}
          </Typography>
        </Box>
      </CardContent>
    </Box>
  </Link>
);
const TutorialCardTags = ({ tutorial }) => (
  <Box
    sx={{
      width: "100%",
      display: "flex",
      columnGap: ".5em",
    }}
  >
    {tutorial.tags?.map(({ label, slug, _id }) => (
      <Link key={_id} to={"/tutorials/tags/" + slug}>
        <Chip label={label} sx={{ cursor: "pointer" }} />
      </Link>
    ))}
  </Box>
);

export default function TutorialCard({ tutorial }) {
  return (
    <Card
      className={classes.card}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexWrap: "wrap",
        marginBottom: "2em",
        padding: "2em",
      }}
    >
      <TutorialCardDetailLink tutorial={tutorial} />
      <TutorialCardUserInfo tutorial={tutorial} />
      <TutorialCardTags tutorial={tutorial} />
    </Card>
  );
}
