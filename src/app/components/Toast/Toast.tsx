"use client";

import { Alert, Snackbar } from "@mui/material";
import { ToastProps } from "./Toast.types";

const Toast = (props: ToastProps) => {
  const { message, status, duration = 6000, onClose } = props;

  return (
    <Snackbar open={true} autoHideDuration={duration} onClose={onClose}>
      <Alert severity={status} variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
