import { Link } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import useTutorialsHook from "./hook";
import { useEffect } from "react";
import Loading from "/features/Loading";

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
      <Link to="/tutorials/new">
        <Button>Create New Tutorial</Button>
        <Box>
          {tutorials.map(({ slug, title }) => (
            <Link key={slug} to={`/tutorials/${slug}`}>
              {title}
            </Link>
          ))}
        </Box>
      </Link>
    </div>
  );
}
