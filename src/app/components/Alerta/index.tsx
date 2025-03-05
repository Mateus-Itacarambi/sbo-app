import React from "react";
import styles from "./alerta.module.scss";

interface AlertaProps {
  text: string;
  theme: string;
  onClick?: () => void; // Função opcional sem parâmetros e sem retorno
}

export default function Alerta({ text, theme }: AlertaProps) {
  return (
    <div className={`${styles.mensagem} ${styles[theme]}`}>
      {text}
    </div>
  );
}
