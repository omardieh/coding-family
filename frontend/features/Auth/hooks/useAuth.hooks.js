import { useNavigate } from "react-router-dom";
import useFetch from "/common/hooks/useFetch";

export function useAuth() {
  const { data, error, loading, fetcher } = useFetch(
    import.meta.env.VITE_SERVER_URL
  );
  const navigate = useNavigate();

  return {
    data,
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
      navigate("/login");
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
