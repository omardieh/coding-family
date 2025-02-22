import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCookie } from "../utilities/getCookie";
import Loading from "/features/Loading";

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
  console.log("CsrfProvider csrfToken:", state);

  if (state.isLoading) return <Loading />;

  return <CsrfContext.Provider value={state}>{children}</CsrfContext.Provider>;
};
