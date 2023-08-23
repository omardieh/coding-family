import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const CaptchaContext = createContext();

export const useCaptchaContext = () => useContext(CaptchaContext);

export const CaptchaProvider = ({ children }) => {
  const [isVerified, setIsVerified] = useState(false);

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
          .then((token) => {
            axios
              .post(`${import.meta.env.VITE_SERVER_URL}/auth/captcha`, {
                token,
              })
              .then((response) => {
                setIsVerified(response.data.verified);
              })
              .catch((error) => {
                console.error(error);
              });
          });
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <CaptchaContext.Provider value={{ isVerified }}>
      {children}
    </CaptchaContext.Provider>
  );
};
