import Paginacao from "@/components/Paginacao";
import TemaCard from "./TemaCard";
import { Tema } from "@/types";
import styles from "./temasPage.module.scss";

interface ListaProfessoresProps {
  temas: Tema[];
  paginaAtual: number;
  totalPaginas: number;
  onPaginaChange: (p: number) => void;
}

export default function ListaProfessores({ temas, paginaAtual, totalPaginas, onPaginaChange }: ListaProfessoresProps) {
  return (
    <section className={styles.lista_professores}>
      <h2>Consultar Temas</h2>

      <div className={styles.professores_container}>
        <div className={styles.professores}>
          {temas.map((t) => (
            <TemaCard key={t.id} tema={t} />
          ))}
        </div>
      
        <Paginacao
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            onPaginaChange={onPaginaChange}
        />
      </div>
    </section>
  );
}
