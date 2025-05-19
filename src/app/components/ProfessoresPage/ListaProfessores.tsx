import Paginacao from "./Paginacao";
import ProfessorCard from "./ProfessorCard";
import { Professor } from "@/types";
import styles from "./professoresPage.module.scss";

interface ListaProfessoresProps {
  professores: Professor[];
  paginaAtual: number;
  totalPaginas: number;
  onPaginaChange: (p: number) => void;
}

export default function ListaProfessores({ professores, paginaAtual, totalPaginas, onPaginaChange }: ListaProfessoresProps) {
  return (
    <section className={styles.lista_professores}>
      <h2>Consultar Professores</h2>

      <div className={styles.professores_container}>
        {professores.map((p) => (
          <ProfessorCard key={p.id} professor={p} />
        ))}
      
        <Paginacao
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            onPaginaChange={onPaginaChange}
        />
      </div>
    </section>
  );
}
