import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useCsrfContext } from "./CsrfContext";
import { LoadingSpinner } from "/common/components";

const CaptchaContext = createContext();

export const useCaptchaContext = () => useContext(CaptchaContext);

export const CaptchaProvider = ({ children }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { csrfToken } = useCsrfContext();

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
                return;
              }
              setIsVerified(false);
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
  }, []);

  if (isLoading) return <LoadingSpinner />;

  if (!isVerified) {
    return (
      <div>
        <h3>reCAPTCHA verification failed. Please try again.</h3>
        <button
          onClick={() => {
            window.location.reload();
          }}
        >
          Reload
        </button>
      </div>
    );
  }
  return <CaptchaContext.Provider>{children}</CaptchaContext.Provider>;
};
