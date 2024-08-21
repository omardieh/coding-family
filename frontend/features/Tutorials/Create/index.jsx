import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../../../common/components/Toast";
import useTutorialsHook from "../hook";
import TutorialForm from "../TutorialForm";
import Loading from "/features/Loading";

export default function TutorialsCreate() {
  const {
    data: response,
    loading,
    error,
    postNewTutorial,
  } = useTutorialsHook();
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (response?.created) navigate("/tutorials/" + response.tutorial.slug);
    }, 3000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [response]);

  if (loading) return <Loading />;
  if (response?.created)
    return <Toast message={"Tutorial has been created successfully"} />;

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
