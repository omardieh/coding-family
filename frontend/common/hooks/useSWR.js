import axios from "axios";
import { useCallback, useEffect } from "react";
import { default as fetchSWR } from "swr";
import { getCookie } from "../utilities/getCookie";

export default function useSWR({ baseURL }) {
  if (!baseURL) throw new Error("baseURL is required");
  const csrfToken = getCookie("XSRF-TOKEN");
  if (!csrfToken) throw new Error("csrfToken is required");
  const userToken = localStorage.getItem("accessToken");

  useEffect(() => {
    axios.defaults.withCredentials = true;
    const requestInterceptor = axios.interceptors.request.use((config) => ({
      ...config,
      headers: {
        ...config.headers,
        "X-XSRF-TOKEN": csrfToken,
        ...(userToken && { Authorization: userToken }),
      },
    }));
    return () => {
      axios.defaults.withCredentials = false;
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [csrfToken, userToken]);

  const handleFetch = useCallback(
    async ({
      method = "GET",
      endPoint = "/",
      reqBody = null,
      headers = {},
      timeout = 0,
    }) => {
      const source = axios.CancelToken.source();
      try {
        const response = await axios({
          method,
          url: endPoint,
          baseURL,
          data: reqBody,
          headers,
          timeout,
          cancelToken: source.token,
        });
        return response;
      } catch (err) {
        if (import.meta.env.NODE_ENV === "development") console.error(err);
        throw err.response ? err.response.data : err.message;
      }
    },
    [baseURL]
  );

  const fetcher = useCallback(
    ({
      method = "GET",
      endPoint = "/",
      reqBody = null,
      headers = {},
      timeout = 0,
      isFetching = true,
      swr = {},
    }) =>
      fetchSWR(
        isFetching ? [endPoint, method, reqBody] : null,
        () => handleFetch({ method, endPoint, reqBody, headers, timeout }),
        {
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          shouldRetryOnError: false,
          ...swr,
        }
      ),
    [handleFetch]
  );

  return { fetcher };
}
