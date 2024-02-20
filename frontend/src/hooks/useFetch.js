import axios from "axios";
import { useState } from "react";

export default function useFetch(baseURL) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetcher = async ({ method = "GET", endPoint = "/", reqBody }) => {
    setLoading(true);
    try {
      const response = await axios.request({
        baseURL,
        method,
        url: endPoint,
        data: reqBody,
      });
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetcher };
}
