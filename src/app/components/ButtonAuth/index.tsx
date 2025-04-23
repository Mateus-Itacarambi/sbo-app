import React from "react";
import styles from "./button.module.scss";

interface ButtonAuthProps {
  text: React.ReactNode;
  type: "button" | "submit" | "reset";
  theme: string;
  onClick?: () => void;
  disabled?: boolean;
  margin?: string;
}

export default function ButtonAuth({ text, type, onClick, theme, disabled, margin }: ButtonAuthProps) {
  return (
    <button className={`${styles.button} ${styles[theme]}`} onClick={onClick} type={type} disabled={disabled} style={{ margin: margin}}>
      {text}
    </button>
  );
}
