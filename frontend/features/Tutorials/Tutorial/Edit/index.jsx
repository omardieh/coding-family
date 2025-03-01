import { useParams } from "react-router-dom";
import { useAuthContext } from "/common/contexts";
import useTutorialsHook from "/features/Tutorials/hook";
import TutorialForm from "../../TutorialForm";
import { useEffect } from "react";
import { LoadingSpinner } from "/common/components";

export default function TutorialEdit() {
  const { slug } = useParams();
  const { user } = useAuthContext();
  const {
    data: tutorial,
    error,
    loading,
    getTutorialBySlug,
  } = useTutorialsHook();
  const {
    data: updatedTutorial,
    error: updatedError,
    loading: updatedLoading,
    updateTutorialBySlug,
  } = useTutorialsHook();

  useEffect(() => {
    getTutorialBySlug(slug);
  }, [updatedTutorial]);

  if (loading || updatedLoading || !tutorial) return <LoadingSpinner />;

  return (
    <TutorialForm
      headingTitle="Edit Tutorial"
      onSubmit={(reqBody) => updateTutorialBySlug(slug, reqBody)}
      errorMessage={updatedError}
      content={tutorial.content}
      title={tutorial.title}
      description={tutorial.description}
      tags={tutorial.tags}
      isPublic={tutorial.isPublic}
      infoMessage={updatedTutorial?.updated ? "Successfully updated" : null}
    />
  );
}
