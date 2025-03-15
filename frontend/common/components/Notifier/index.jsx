import { toast, Slide } from "react-toastify";
import "./index.css";

export function Notifier() {
  const toastOptions = {
    success: {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: false,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: false,
      pauseOnHover: false,
      type: "success",
    },
    error: {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: false,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: false,
      pauseOnHover: false,
      type: "error",
    },
  };

  const useToast = ({ message, options, redirect }) =>
    toast(
      <p>
        {message} <br /> redirecting to {redirect || "login"} page..
      </p>,
      options
    );

  return {
    onSuccess: ({ message, options, redirect }) =>
      useToast({
        message,
        options: { ...toastOptions.success, ...options },
        redirect,
      }),
    onError: ({ message, options, redirect }) =>
      useToast({
        message,
        options: { ...toastOptions.error, ...options },
        redirect,
      }),
  };
}
