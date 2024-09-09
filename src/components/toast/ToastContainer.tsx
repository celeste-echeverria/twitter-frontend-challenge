import styled from "styled-components";
import { ToastType } from "./Toast";

interface StyledToastContainerProps {
  type: ToastType;
}

export const StyledToastContainer = styled.div<StyledToastContainerProps>`
  position: fixed;
  bottom: 20px; /* Posicionado en la parte inferior */
  left: 50%; /* Centrando horizontalmente */
  transform: translateX(-50%); /* Ajusta el elemento para estar perfectamente centrado */
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: ${({ type }) => 
    type === "SUCCESS" ? "#DFF2BF" : "#FFBABA"}; /* Fondo más claro */
  color: black; /* Letras negras */
  z-index: 9999;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid black; /* Borde negro fino */

  p {
    margin: 0;
    font-weight: bold;
  }
`;

