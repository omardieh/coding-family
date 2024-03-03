import { useParams } from "react-router-dom";
import { useAuthContext } from "/common/contexts/AuthContext";
import useTutorialsHook from "/features/Tutorials/hook";
import Loading from "/features/Loading";
import TutorialForm from "../../TutorialForm";
import { useEffect } from "react";

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
  console.log(updatedTutorial, tutorial);

  if (loading || updatedLoading || !tutorial) return <Loading />;
  const isOwner =
    JSON.stringify(tutorial.author._id) === JSON.stringify(user._id);

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
