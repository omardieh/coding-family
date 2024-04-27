import { Box } from "@mui/material";
import { useEffect } from "react";
import TutorialCard from "./TutorialCard";
import useTutorialsHook from "./hook";
import "./styles.css";
import Loading from "/features/Loading";

export default function Tutorials() {
  const {
    data: tutorials,
    error,
    loading,
    getAllTutorials,
  } = useTutorialsHook();

  useEffect(() => {
    getAllTutorials(tutorials);
  }, []);

  if (loading) return <Loading />;

  return (
    <Box>
      {tutorials?.map((tutorial) => (
        <TutorialCard key={tutorial._id} tutorial={tutorial} />
      ))}
    </Box>
  );
}
