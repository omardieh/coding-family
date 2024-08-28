import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { getCookie } from "../utilities/getCookie";

export default function useFetch(baseURL) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["Access-Control-Allow-Headers"] =
      "Authorization";
    const accessToken = localStorage.getItem("accessToken");
    const csrfToken = getCookie("XSRF-TOKEN");
    const requestInterceptor = axios.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = accessToken;
      }
      if (csrfToken) {
        config.headers["X-XSRF-TOKEN"] = csrfToken;
      }
      return config;
    });
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.defaults.withCredentials = false;
      delete axios.defaults.headers.common["Access-Control-Allow-Headers"];
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
