import useTutorialsHook from "../hook";
import TutorialForm from "../TutorialForm";

export default function TutorialsCreate() {
  const { data: response, error, postNewTutorial } = useTutorialsHook();

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
