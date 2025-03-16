import { toast } from "react-toastify";
import "./index.css";

export function Notifier() {
  const common = {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: false,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: false,
    pauseOnHover: false,
  };

  const toastOptions = {
    success: {
      ...common,
      type: "success",
    },
    error: {
      ...common,
      type: "error",
    },
  };

  const useToast = ({ message, options, redirect }) =>
    toast(
      <p>
        {message}
        {redirect && <br />}
        {redirect && `redirecting to ${redirect || "login"} page..`}
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
