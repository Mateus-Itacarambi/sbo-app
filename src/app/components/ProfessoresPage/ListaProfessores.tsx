import Paginacao from "./Paginacao";
import ProfessorCard from "./ProfessorCard";
import { Professor } from "@/types";

interface ListaProfessoresProps {
  professores: Professor[];
  paginaAtual: number;
  totalPaginas: number;
  onPaginaChange: (p: number) => void;
}

export default function ListaProfessores({ professores, paginaAtual, totalPaginas, onPaginaChange }: ListaProfessoresProps) {
  return (
    <section className="lista-professores">
      {professores.map((p) => (
        <ProfessorCard key={p.id} professor={p} />
      ))}
      
        <Paginacao
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            onPaginaChange={onPaginaChange}
        />
    </section>
  );
}
