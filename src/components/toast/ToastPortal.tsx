import React from "react";
import ReactDOM from "react-dom";
import Toast, { ToastType } from "./Toast";

interface ToastPortalProps {
  message: string;
  type: ToastType;
  duration?: number;
}

const ToastPortal: React.FC<ToastPortalProps> = ({ message, type }) => {
  return ReactDOM.createPortal(
    <Toast message={message} type={type} show={true} duration={3000}/>,
    document.body 
  );
};

export default ToastPortal;
