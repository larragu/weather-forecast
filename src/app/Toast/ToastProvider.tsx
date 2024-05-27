"use client";

import { createContext, useCallback, useContext, useState } from "react";
import ReactDOM from "react-dom";
import ToastComponent from "./Toast";
import { ToastProps } from "./Toast.types";

interface WeatherProviderProps {
  children: React.ReactNode;
}

type Toast = Omit<ToastProps, "onClose">;
type ToastContextProps = (props: Toast) => void;

const portalDiv =
  typeof window !== "undefined" ? document.getElementById("toast-root") : null;

const ToastContext = createContext<ToastContextProps | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast has to be within ToastContext.Provider");
  }
  return context;
};

const ToastProvider = ({ children }: WeatherProviderProps) => {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = useCallback(({ message, status }: Toast) => {
    setToast({ message, status });
  }, []);

  const closeToastHandler = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {portalDiv && toast
        ? ReactDOM.createPortal(
            <ToastComponent {...toast} onClose={closeToastHandler} />,

            portalDiv
          )
        : null}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
