import Paginacao from "@/components/Paginacao";
import ProfessorCard from "./ProfessorCard";
import { Professor } from "@/types";
import styles from "./professoresPage.module.scss";
import { useEffect, useRef } from "react";

interface ListaProfessoresProps {
  professores: Professor[];
  paginaAtual: number;
  totalPaginas: number;
  onPaginaChange: (p: number) => void;
}

export default function ListaProfessores({ professores, paginaAtual, totalPaginas, onPaginaChange }: ListaProfessoresProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [paginaAtual]);

  return (
    <section className={styles.lista_professores}>
      <h2>Consultar Professores</h2>

      <div className={styles.professores_container} ref={containerRef}>
        <div className={styles.professores}>
          {professores.map((p) => (
            <ProfessorCard key={p.id} professor={p} />
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
