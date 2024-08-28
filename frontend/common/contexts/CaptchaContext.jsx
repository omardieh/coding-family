import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { getCookie } from "../utilities/getCookie";
import Loading from "/features/Loading";

const CaptchaContext = createContext();

export const useCaptchaContext = () => useContext(CaptchaContext);

export const CaptchaProvider = ({ children }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const csrfToken = getCookie("XSRF-TOKEN");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${
      import.meta.env.VITE_GOOGLE_CAPTCHA_KEY
    }`;
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(import.meta.env.VITE_GOOGLE_CAPTCHA_KEY, {
            action: "submit",
          })
          .then(async (token) => {
            try {
              if (csrfToken) {
                const response = await axios.post(
                  `${import.meta.env.VITE_SERVER_URL}/auth/captcha`,
                  { token },
                  {
                    headers: { "X-XSRF-TOKEN": csrfToken }, // Include CSRF token in the headers
                    withCredentials: true, // Ensure cookies are sent with the request
                  }
                );
                setIsVerified(response.data.verified);
              } else {
                setIsVerified(false);
              }
            } catch (error) {
              console.error("Error captcha:", error);
            } finally {
              setIsLoading(false);
            }
          });
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [csrfToken]);

  if (isLoading) return <Loading />;
  return (
    <CaptchaContext.Provider value={{ isVerified, isLoading }}>
      {children}
    </CaptchaContext.Provider>
  );
};
