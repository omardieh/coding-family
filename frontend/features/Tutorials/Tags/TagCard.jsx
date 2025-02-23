import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const TagCardDetailLink = ({ tag }) => (
  <Link
    to={`/tutorials/tags/${tag.slug}`}
    style={{ textDecoration: "none", display: "block" }}
  >
    <Box>
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "8px",
            color: "#333",
          }}
        >
          {tag.label}
        </Typography>
        <br />
        <Box component="span">
          <Typography variant="body2" color="textSecondary">
            total tutorials: {tag.tutorials.length}
          </Typography>
        </Box>
      </CardContent>
    </Box>
  </Link>
);

export default function TagCard({ tag }) {
  return (
    <Card
      sx={{
        margin: "1em",
        textDecoration: "none",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.3s ease",
        borderRadius: "8px",
        width: "100%",
        maxWidth: "350px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        padding: "2em",
      }}
    >
      <TagCardDetailLink tag={tag} />
    </Card>
  );
}
