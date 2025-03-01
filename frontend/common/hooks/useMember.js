import useFetch from "/common/hooks/useFetch";

export default function useMember() {
  const { data, error, loading, fetcher } = useFetch(
    import.meta.env.VITE_SERVER_URL
  );

  return {
    data,
    error,
    loading,

    getUserInfo: async () =>
      await fetcher({
        endPoint: "/user/profile",
      }),

    updateUserInfo: async (reqBody) =>
      await fetcher({
        method: "PATCH",
        endPoint: "/user/profile",
        reqBody,
      }),
  };
}
