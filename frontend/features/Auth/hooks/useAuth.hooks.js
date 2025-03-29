import useSWR from "/common/hooks/useSWR";

export function useAuthHook() {
  const { fetcher } = useSWR({ baseURL: import.meta.env.VITE_SERVER_URL });

  return {
    // Authentication
    logUserIn: (reqBody, isFetching) =>
      fetcher({
        method: "POST",
        endPoint: "/auth/login",
        reqBody,
        isFetching,
      }),

    signUserUp: (reqBody) =>
      fetcher({
        method: "POST",
        endPoint: "/auth/signup",
        reqBody,
      }),

    logUserOut: () => {
      localStorage.removeItem("accessToken");
      return fetcher({
        endPoint: "/auth/logout",
      });
    },

    // OAuth providers
    logGithubUserIn: (code) =>
      fetcher({
        method: "POST",
        endPoint: "/auth/github",
        reqBody: { code },
      }),

    logGoogleUserIn: (code) =>
      fetcher({
        method: "POST",
        endPoint: "/auth/google",
        reqBody: { code },
      }),

    // Token management
    verifyUserToken: () =>
      fetcher({
        endPoint: "/auth/token/verify",
      }),

    verifyEmail: ({ userID, token, code }) =>
      fetcher({
        method: "POST",
        endPoint: "/auth/email/verify",
        reqBody: { userID, code },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    // Local storage helpers
    getUserToken: () => localStorage.getItem("accessToken"),
    storeUserToken: (token) => localStorage.setItem("accessToken", token),
  };
}
export function useAuth() {
  const { fetcher } = useSWR({ baseURL: import.meta.env.VITE_SERVER_URL });

  return {
    // Authentication
    logUserIn: (reqBody) =>
      fetcher({
        method: "POST",
        endPoint: "/auth/login",
        reqBody,
      }),

    signUserUp: (reqBody) =>
      fetcher({
        method: "POST",
        endPoint: "/auth/signup",
        reqBody,
      }),

    logUserOut: () => {
      localStorage.removeItem("accessToken");
      return fetcher({
        endPoint: "/auth/logout",
      });
    },

    // OAuth providers
    logGithubUserIn: (code) =>
      fetcher({
        method: "POST",
        endPoint: "/auth/github",
        reqBody: { code },
      }),

    logGoogleUserIn: (code) =>
      fetcher({
        method: "POST",
        endPoint: "/auth/google",
        reqBody: { code },
      }),

    // Token management
    verifyUserToken: () =>
      fetcher({
        endPoint: "/auth/token/verify",
      }),

    verifyEmail: ({ userID, token, code }) =>
      fetcher({
        method: "POST",
        endPoint: "/auth/email/verify",
        reqBody: { userID, code },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    // Local storage helpers
    getUserToken: () => localStorage.getItem("accessToken"),
    storeUserToken: (token) => localStorage.setItem("accessToken", token),
  };
}
