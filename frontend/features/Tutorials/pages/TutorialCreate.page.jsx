// frontend/features/Tutorials/pages/TutorialCreate.page.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTutorialsHook } from "../hooks";
import { TutorialForm } from "../components";
import {
  PageLayout,
  PageCard,
  LoadingSpinner,
  Notifier,
} from "/common/components";

export function TutorialCreate() {
  const navigate = useNavigate();
  const { onSuccess } = Notifier();
  const { postNewTutorial } = useTutorialsHook();
  const [isFetching, setIsFetching] = useState(false);
  const [reqBody, setReqBody] = useState(null);

  const { data, isLoading, isValidating, error } = postNewTutorial(
    reqBody,
    isFetching
  );
  const created = data?.data?.created;
  const slug = data?.data?.tutorial?.slug;

  useEffect(() => {
    let timeoutID;
    if (created) {
      onSuccess({
        message: "Tutorial created successfully",
        redirect: slug,
        options: { autoClose: 2500 },
      });
      timeoutID = setTimeout(() => {
        navigate(`/tutorials/${slug}`);
      }, 2500);
    }
    return () => clearTimeout(timeoutID);
  }, [created, slug, onSuccess, navigate]);

  const handleSubmit = (formData) => {
    setReqBody(formData);
    setIsFetching(true);
  };

  if (isLoading || isValidating) {
    return <LoadingSpinner />;
  }

  return (
    <PageLayout sx={{ top: "1em" }}>
      <PageCard>
        <TutorialForm
          headingTitle="Create new Tutorial"
          onSubmit={handleSubmit}
          errorMessage={error}
          infoMessage={data?.created ? "Successfully created" : null}
        />
      </PageCard>
    </PageLayout>
  );
}
