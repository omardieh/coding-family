import { Link } from "react-router-dom";
import useTutorialsHook from "./hook";
import { useEffect } from "react";
import Loading from "/features/Loading";
import "./MDEditor.css";
import { Box, Button } from "@mui/material";

export default function Tutorials() {
  const {
    data: tutorials,
    error,
    loading,
    getAllTutorials,
  } = useTutorialsHook();

  useEffect(() => {
    getAllTutorials();
  }, []);

  if (loading || !tutorials) return <Loading />;

  return (
    <div>
      <Link to="/tutorials/create">
        <Button variant="outlined">Create New Tutorial</Button>
      </Link>
      <Box>
        {tutorials.map(({ slug, title }) => (
          <Link key={slug} to={`/tutorials/${slug}`}>
            {title}
          </Link>
        ))}
      </Box>
    </div>
  );
}
