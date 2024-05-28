import { useContext } from "react";
import { ToastContext } from "./ToastProvider";

const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast has to be within ToastContext.Provider");
  }
  return context;
};

export default useToast;
