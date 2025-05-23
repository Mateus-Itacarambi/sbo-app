import React from "react";
import styles from "./button.module.scss";

interface ButtonAuthProps {
  text: React.ReactNode;
  type: "button" | "submit" | "reset";
  theme: string;
  onClick?: () => void;
  disabled?: boolean;
  margin?: string;
  icon?: boolean;
}

export default function ButtonAuth({ text, type, onClick, theme, disabled, margin, icon=false }: ButtonAuthProps) {
  return (
    <>
      {!icon ? (
        <button className={`${styles.button} ${styles[theme]}`} onClick={onClick} type={type} disabled={disabled} style={{ margin: margin }}>
          {text}
        </button>
      ) : (
        <button className={`${styles.button} ${styles[theme]}`} onClick={onClick} type={type} disabled={disabled} style={{  margin: margin, width: "0", height:"0", backgroundColor: "white" }}>
          {text}
        </button>
      )}
    </>
  );
}
