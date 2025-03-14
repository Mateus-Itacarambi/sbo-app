import React from "react";
import styles from "./button.module.scss";

interface ButtonAuthProps {
  text: React.ReactNode;
  type: "button" | "submit" | "reset";
  theme: string;
  onClick?: () => void;
  disabled: boolean;
}

export default function ButtonAuth({ text, type, onClick, theme, disabled }: ButtonAuthProps) {
  return (
    <button className={`${styles.button} ${styles[theme]}`} onClick={onClick} type={type} disabled={disabled}>
      {text}
    </button>
  );
}
