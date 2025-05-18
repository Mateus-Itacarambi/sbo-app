'use client';

import { useEffect, useState } from "react";
import FiltroProfessor from "./FiltroProfessor";
import ListaProfessores from "./ListaProfessores";
import Paginacao from "./Paginacao";
import { Professor } from "@/types"; // Sua interface

interface PaginaProfessores {
  content: Professor[];
  totalPages: number;
  number: number;
}

export default function ProfessoresPage() {
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [pagina, setPagina] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [filtros, setFiltros] = useState({ nome: "", curso: "", disciplina: "", disponibilidade: "", area: "" });

  useEffect(() => {
    const fetchProfessores = async () => {
      const query = new URLSearchParams({
        page: pagina.toString(),
        size: "10",
        ...filtros,
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/professores?${query}`);
      const data: PaginaProfessores = await res.json();
      setProfessores(data.content);
      setTotalPaginas(data.totalPages);
    };

    fetchProfessores();
  }, [pagina, filtros]);

  return (
    <div className="pagina-professores">
      <FiltroProfessor filtros={filtros} setFiltros={setFiltros} />
      <ListaProfessores professores={professores} />
      <Paginacao paginaAtual={pagina} totalPaginas={totalPaginas} onPaginaChange={setPagina} />
    </div>
  );
}
