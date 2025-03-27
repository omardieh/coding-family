import useFetch from "/common/hooks/useFetch";

export function useAuth() {
  const { data, headers, error, loading, fetcher } = useFetch(
    import.meta.env.VITE_SERVER_URL
  );

  return {
    data,
    headers,
    error,
    loading,

    logUserIn: async (reqBody) =>
      await fetcher({
        method: "POST",
        endPoint: "/auth/login",
        reqBody,
      }),

    logGithubUserIn: async (code) =>
      await fetcher({
        method: "POST",
        endPoint: "/auth/github",
        reqBody: { code },
      }),

    logGoogleUserIn: async (code) =>
      await fetcher({
        method: "POST",
        endPoint: "/auth/google",
        reqBody: { code },
      }),

    signUserUp: async (reqBody) =>
      await fetcher({
        method: "POST",
        endPoint: "/auth/signup",
        reqBody,
      }),

    logUserOut: async () => {
      localStorage.removeItem("accessToken");
      await fetcher({
        endPoint: "/auth/logout",
      });
    },

    verifyUserToken: async () =>
      await fetcher({
        endPoint: "/auth/token/verify",
      }),

    verifyEmail: async ({ userID, token, code }) =>
      await fetcher({
        method: "POST",
        endPoint: "/auth/email/verify",
        reqBody: { userID, code },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    getUserToken: () => localStorage.getItem("accessToken"),
    storeUserToken: (token) => localStorage.setItem("accessToken", token),
  };
}
