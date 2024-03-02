import useFetch from "/common/hooks/useFetch";

export default function useTutorialsHook() {
  const { data, error, loading, fetcher } = useFetch(
    import.meta.env.VITE_SERVER_URL
  );

  const postNewTutorial = async (reqBody) => {
    await fetcher({
      method: "POST",
      endPoint: "/tutorials",
      reqBody,
    });
  };

  const getAllTutorials = async () => {
    await fetcher({
      endPoint: "/tutorials",
    });
  };

  const getTutorialBySlug = async (slug) => {
    await fetcher({
      endPoint: "/tutorials/" + slug,
    });
  };

  const deleteTutorialBySlug = async (slug) => {
    await fetcher({
      method: "DELETE",
      endPoint: "/tutorials/" + slug,
    });
  };

  const updateTutorialBySlug = async (slug, reqBody) => {
    await fetcher({
      method: "PUT",
      endPoint: "/tutorials/" + slug,
      reqBody,
    });
  };

  return {
    data,
    error,
    loading,
    postNewTutorial,
    getAllTutorials,
    getTutorialBySlug,
    deleteTutorialBySlug,
    updateTutorialBySlug,
  };
}
