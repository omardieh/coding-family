import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTutorialsHook from "../hook";
import TutorialForm from "../TutorialForm";
import {
  PageLayout,
  PageCard,
  ToastMessage,
  LoadingSpinner,
} from "/common/components";

export default function TutorialsCreate() {
  const navigate = useNavigate();
  const { postNewTutorial } = useTutorialsHook();

  const { data, isLoading, error } = postNewTutorial();

  useEffect(() => {
    if (data?.created) {
      const timeoutId = setTimeout(() => {
        navigate(`/tutorials/${data.tutorial.slug}`);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [data.created]);

  if (isLoading) return <LoadingSpinner />;
  if (data?.created) {
    return <ToastMessage message="Tutorial has been created successfully" />;
  }

  return (
    <PageLayout sx={{ top: "1em" }}>
      <PageCard>
        <TutorialForm
          headingTitle="Create new Tutorial"
          onSubmit={(formData) => postNewTutorial(formData)}
          errorMessage={error}
        />
      </PageCard>
    </PageLayout>
  );
}
