import useSWR from "/common/hooks/useSWR";

export function useTutorialsHook() {
  const { fetcher } = useSWR({ baseURL: import.meta.env.VITE_SERVER_URL });
  return {
    getAllTutorials: (reqQuery = {}) => {
      const queryString = new URLSearchParams(reqQuery).toString();
      return fetcher({
        endPoint: `/tutorials${queryString ? `?${queryString}` : ""}`,
      });
    },
    getTutorialBySlug: (slug) =>
      fetcher({
        endPoint: "/tutorials/" + slug,
      }),
    deleteTutorialBySlug: (slug) =>
      fetcher({ method: "DELETE", endPoint: "/tutorials/" + slug }),
    updateTutorialBySlug: (slug, reqBody, isFetching) =>
      fetcher({
        method: "PATCH",
        endPoint: "/tutorials/" + slug,
        reqBody,
        isFetching,
      }),
    getTutorialsTags: () => fetcher({ endPoint: "/tutorials/tags" }),
    getTutorialsByTag: (slug) =>
      fetcher({ endPoint: "/tutorials/tags/" + slug }),
    postNewTutorial: (reqBody, isFetching) =>
      fetcher({
        method: "POST",
        endPoint: "/tutorials",
        reqBody,
        isFetching,
        swr: {
          revalidate: true,
        },
      }),
  };
}
