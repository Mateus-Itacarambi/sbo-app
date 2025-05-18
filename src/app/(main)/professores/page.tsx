"use client";

import { useEffect, useState } from "react";
import { Professor } from "@/types";
import FiltroProfessor from "@/components/ProfessoresPage/FiltroProfessor";
import ListaProfessores from "@/components/ProfessoresPage/ListaProfessores";
import Paginacao from "@/components/ProfessoresPage/Paginacao";
import styles from "./professoes.module.scss";

interface Page<T> {
  content: T[];
  totalPages: number;
  number: number;
  totalElements: number;
  size: number;
}

export default function ProfessoresPage() {
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [filtros, setFiltros] = useState({
    nome: "",
    curso: "",
    disponibilidade: "",
    areaInteresse: ""
  });

  useEffect(() => {
    buscarProfessores();
  }, [paginaAtual, filtros]);

  const buscarProfessores = async () => {
    const params = new URLSearchParams({
      page: paginaAtual.toString(),
      size: "10",
      sort: "nome",
      ...Object.fromEntries(
        Object.entries(filtros).filter(([, valor]) => valor.trim() !== "")
      )
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/professores?${params}`);
    const data: Page<Professor> = await res.json();

    setProfessores(data.content);
    setTotalPaginas(data.totalPages);
  };

  return (
    <div className={styles.main}>
        <div className={styles.container}>
            <FiltroProfessor filtros={filtros} setFiltros={setFiltros} />
            <ListaProfessores 
                professores={professores}
                paginaAtual={paginaAtual}
                totalPaginas={totalPaginas}
                onPaginaChange={setPaginaAtual}
             />
        </div>
    </div>
  );
}
