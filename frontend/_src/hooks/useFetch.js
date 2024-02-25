import axios from "axios";
import { useState, useMemo } from "react";

export default function useFetch(baseURL) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetcher = useMemo(() => async ({ method = "GET", endPoint = "/", reqBody = null, headers = {}, timeout = 0 }) => {
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
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Request canceled", err.message); // Handle cancellation
      } else {
        setError(err.response ? err.response.data : err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [baseURL]);

  return { data, error, loading, fetcher };