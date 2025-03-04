import { toast } from "react-toastify";
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
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      type: "error",
    },
  };

  const useToast = (message, options) => toast(<p> {message} </p>, options);

  return {
    onSuccess: (message) => useToast(message, toastOptions.success),
    onError: (message, options) =>
      useToast(message, { ...toastOptions.error, ...options }),
  };
}
