import { Tema } from "@/types";
import styles from "./temasPage.module.scss";

export default function ProfessorCard({ tema }: { tema: Tema }) {
  return (
    <div className={styles.card_tema}>
      <h3>{tema.titulo}</h3>
    </div>
  );
}
