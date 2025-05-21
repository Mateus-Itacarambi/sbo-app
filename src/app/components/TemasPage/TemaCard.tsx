import { Tema } from "@/types";
import styles from "./temasPage.module.scss";
import ButtonAuth from "../ButtonAuth";

export default function TemaCard({ tema }: { tema: Tema }) {
  return (
    <div className={styles.card_tema}>
      <h3>{tema.titulo}</h3>

      <p className={styles.info}>
        <strong>Palavras-chave:</strong> 
        {tema.palavrasChave}
      </p>

      <p className={styles.info}>
        <strong>Descrição:</strong> 
        {tema.descricao}
      </p>

      <p className={styles.info}>
        <strong>Orientador:</strong> 
        {tema.professor.nome}
      </p>

      <ButtonAuth text={"Solicitar Tema"} type="button" theme="primary" margin=".5rem 0 0 0" />
    </div>
  );
}
