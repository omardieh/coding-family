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

  const getAllTutorials = async (reqQuery = {}) => {
    const queryKeys = Object.keys(reqQuery);
    let endPointQuery = "";
    if (queryKeys.length) {
      const [first, last] = [queryKeys[0], queryKeys[queryKeys.length - 1]];
      for (const query in reqQuery) {
        if (query === first) endPointQuery += "?";
        endPointQuery += `${query}=${reqQuery[query]}`;
        if (query !== last) endPointQuery += "&";
      }
    }
    await fetcher({
      endPoint: "/tutorials" + endPointQuery,
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

  const getTutorialsTags = async () => {
    await fetcher({
      endPoint: "/tutorials/tags",
    });
  };

  const getTutorialsByTag = async (slug) => {
    await fetcher({
      endPoint: "/tutorials/tags/" + slug,
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
    getTutorialsTags,
    getTutorialsByTag,
  };
}
