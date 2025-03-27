import { Navigate, useParams } from "react-router-dom";
import useTutorialsHook from "/features/Tutorials/hook";
import TutorialForm from "../../TutorialForm";
import { LoadingSpinner } from "/common/components";
import { useErrorContext } from "/features/Error/context";

export default function TutorialEdit() {
  const { slug } = useParams();
  const { handleError } = useErrorContext();
  const { getTutorialBySlug, updateTutorialBySlug } = useTutorialsHook();

  const {
    data: tutorialData,
    isLoading,
    isValidating,
    error,
  } = getTutorialBySlug(slug);
  const { data: updateData, error: updateError } = updateTutorialBySlug(slug);

  if (isLoading || isValidating) return <LoadingSpinner />;
  if (error) {
    handleError(error);
    return <Navigate to="/error" />;
  }

  const { data: tutorial } = tutorialData;

  return (
    <TutorialForm
      headingTitle="Edit Tutorial"
      onSubmit={(reqBody) => updateTutorialBySlug(slug, reqBody)}
      errorMessage={updateError}
      content={tutorial.content}
      title={tutorial.title}
      description={tutorial.description}
      tags={tutorial.tags}
      isPublic={tutorial.isPublic}
      infoMessage={updateData?.updated ? "Successfully updated" : null}
    />
  );
}
