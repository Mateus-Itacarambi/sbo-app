import React from "react";
import styles from "./arrow.module.scss";

interface ArrowProps {
    tamanho: string;
  }

export default function Arrow( {tamanho}: ArrowProps ): JSX.Element {
  return (
    <div className={styles.box}><i className={styles.arrow} style={{padding: `${tamanho}px`}}></i></div>
  );
}
