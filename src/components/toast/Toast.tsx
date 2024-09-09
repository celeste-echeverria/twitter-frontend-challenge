import React, { useEffect, useState } from "react";
import { StyledToastContainer } from "./ToastContainer";
import { AlertIcon, ErrorIcon, SuccessIcon } from "../icon/Icon";

export enum ToastType {
  ALERT = "ALERT",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}


interface ToastProps {
  message: string;
  type: ToastType;
  show?: boolean;
  duration?: number;
}

const Toast = ({ message, type, show, duration = 3000}: ToastProps) => {
  const [isShown, setIsShown] = useState<boolean>(show ?? true);

  const iconMap = {
    [ToastType.ALERT]: <AlertIcon />,
    [ToastType.SUCCESS]: <SuccessIcon />, 
    [ToastType.ERROR]: <ErrorIcon />,   
  };  

  const toastIcon = iconMap[type] || null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(false);
    }, duration); 

    return () => clearTimeout(timer);
  }, [duration]);
  
  return (
    <>
      {isShown && (
        <StyledToastContainer type={type} onClick={() => setIsShown(false)}>
          {toastIcon}
          <p>{message}</p>
        </StyledToastContainer>
      )}
    </>
  );
};

export default Toast;
