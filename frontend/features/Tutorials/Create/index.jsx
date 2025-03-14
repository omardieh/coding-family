import { useEffect, useState } from "react";
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
  const {
    data: response,
    loading,
    error,
    postNewTutorial,
  } = useTutorialsHook();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (response?.created) navigate("/tutorials/" + response.tutorial.slug);
    }, 3000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [response]);

  const handleSubmit = async (data) => {
    setFormData(data);
    await postNewTutorial(data);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (response?.created) {
    return <ToastMessage message={"Tutorial has been created successfully"} />;
  }

  return (
    <>
      <PageLayout sx={{ top: "1em" }}>
        <PageCard>
          <TutorialForm
            headingTitle="Create new Tutorial"
            onSubmit={handleSubmit}
            errorMessage={error}
            initialData={formData}
          />
        </PageCard>
      </PageLayout>
    </>
  );
}
