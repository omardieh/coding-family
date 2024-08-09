import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTutorialsHook from "../hook";
import TutorialForm from "../TutorialForm";

export default function TutorialsCreate() {
  const { data: response, error, postNewTutorial } = useTutorialsHook();
  const navigate = useNavigate();
  console.log(response);
  useEffect(() => {
    if (response?.created) navigate("/tutorials");
  }, [response]);
  return (
    <>
      <TutorialForm
        headingTitle="Create new Tutorial"
        onSubmit={postNewTutorial}
        errorMessage={error}
      />
    </>
  );
}
