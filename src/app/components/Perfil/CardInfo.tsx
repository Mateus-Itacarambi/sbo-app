import styles from "./perfil.module.scss";

interface CardInfoProps {
  titulo: string;
  texto: string;
}

export default function CardInfo({ titulo, texto  }: CardInfoProps) {
  return (
    <div className={styles.card}>
      <h2>{titulo} -</h2>
      <p>{texto}</p>
    </div>
  );
}
