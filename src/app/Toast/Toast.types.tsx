type Status = "error" | "info" | "success" | "warning";
interface ToastProps {
  message: string;
  status: Status;
  duration?: number;
  onClose: () => void;
}

export type { ToastProps, Status };
