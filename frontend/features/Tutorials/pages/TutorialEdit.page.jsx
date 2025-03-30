import { useParams } from "react-router-dom";
import { useTutorialsHook } from "../hooks";
import { TutorialForm } from "../components";
import { LoadingSpinner } from "/common/components";
import { useErrorContext } from "../../error-boundaries/context";
import { useEffect, useState } from "react";

export function TutorialEdit() {
  const { slug } = useParams();
  const { handleError } = useErrorContext();
  const { getTutorialBySlug, updateTutorialBySlug } = useTutorialsHook();
  const [isFetching, setIsFetching] = useState(false);
  const [reqBody, setReqBody] = useState(null);

  const {
    data: dataGetTutorial,
    isLoading: isLoadingGetTutorial,
    isValidating: isValidatingGetTutorial,
    error: errorGetTutorial,
    mutate,
  } = getTutorialBySlug(slug);
  const tutorial = dataGetTutorial?.data;

  const {
    data: dataPatchTutorial,
    isLoading: isLoadingPatchTutorial,
    isValidating: isValidatingPatchTutorial,
    error: errorPatchTutorial,
  } = updateTutorialBySlug(slug, reqBody, isFetching);
  const updateData = dataPatchTutorial?.data;

  useEffect(() => {
    if (updateData?.updated) {
      mutate();
    }
  }, [updateData?.updated, mutate]);

  const handleSubmit = (reqBody) => {
    setReqBody(reqBody);
    setIsFetching(true);
  };

  if (
    isLoadingGetTutorial ||
    isValidatingGetTutorial ||
    isLoadingPatchTutorial ||
    isValidatingPatchTutorial
  )
    return <LoadingSpinner />;

  if (errorGetTutorial || errorPatchTutorial) {
    handleError(errorGetTutorial ? errorGetTutorial : errorPatchTutorial);
    console.log(errorGetTutorial, errorPatchTutorial);
    // return <Navigate to="/error" />;
  }

  return (
    <TutorialForm
      headingTitle="Edit Tutorial"
      onSubmit={handleSubmit}
      errorMessage={errorPatchTutorial}
      content={tutorial.content}
      title={tutorial.title}
      description={tutorial.description}
      tags={tutorial.tags}
      isPublic={tutorial.isPublic}
      infoMessage={updateData?.updated ? "Successfully updated" : null}
    />
  );
}
