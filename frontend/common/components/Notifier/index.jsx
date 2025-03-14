import { toast, Slide } from "react-toastify";
import "./index.css";

export function Notifier() {
  const toastOptions = {
    success: {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      type: "success",
    },
    error: {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: false,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
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
