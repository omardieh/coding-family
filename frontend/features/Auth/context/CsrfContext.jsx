import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { getCookie } from "/common/utilities/getCookie";
import { LoadingSpinner } from "/common/components";

const CsrfContext = createContext();

export const useCsrfContext = () => useContext(CsrfContext);

export const CsrfProvider = ({ children }) => {
  const [state, setState] = useState({
    csrfToken: null,
    isLoading: true,
  });

  useEffect(() => {
    const fetchToken = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_SERVER_URL}/auth/csrf/verify`, {
          withCredentials: true,
        });
        setTimeout(() => {
          const csrfCookie = getCookie("XSRF-TOKEN");
          setState({
            csrfToken: csrfCookie,
            isLoading: false,
          });
        }, 100);
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };
    fetchToken();
  }, []);

  if (state.isLoading) return <LoadingSpinner />;

  return <CsrfContext.Provider value={state}>{children}</CsrfContext.Provider>;
};
