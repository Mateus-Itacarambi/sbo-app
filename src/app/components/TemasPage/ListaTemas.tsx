import Paginacao from "@/components/Paginacao";
import TemaCard from "./TemaCard";
import { Tema } from "@/types";
import styles from "./temasPage.module.scss";
import { useRef, useEffect } from "react";

interface ListaTemasProps {
  temas: Tema[];
  paginaAtual: number;
  totalPaginas: number;
  onPaginaChange: (p: number) => void;
}

export default function ListaTemas({ temas, paginaAtual, totalPaginas, onPaginaChange }: ListaTemasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [paginaAtual]);

  return (
    <section className={styles.lista_temas}>
      <h2>Consultar Temas</h2>

      <div className={styles.temas_container} ref={containerRef}>
        <div className={styles.temas}>
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
