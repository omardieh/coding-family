import axios from "axios";
import { useEffect, useMemo, useState } from "react";

export default function useFetch(baseURL) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const requestInterceptor = axios.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  const fetcher = useMemo(
    () =>
      async ({
        method = "GET",
        endPoint = "/",
        reqBody = null,
        headers = {},
        timeout = 0,
      }) => {
        setLoading(true);
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
          setData(response.data);
          setError(null);
        } catch (err) {
          setError(err.response ? err.response.data : err.message);
        } finally {
          setLoading(false);
        }
      },
    [baseURL]
  );

  return { data, error, loading, fetcher };
}
