import React from "react";
import styles from "./button.module.scss";

interface ButtonAuthProps {
  text: string;
  type: "button" | "submit" | "reset";
  theme: string;
  onClick?: () => void; // Função opcional sem parâmetros e sem retorno
}

export default function ButtonAuth({ text, type, onClick, theme }: ButtonAuthProps) {
  return (
    <button className={`${styles.button} ${styles[theme]}`} onClick={onClick} type={type}>
      {text}
    </button>
  );
}
