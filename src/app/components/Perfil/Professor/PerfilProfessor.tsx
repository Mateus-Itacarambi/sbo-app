import CardInfo from "../CardInfo";
import CardTema from "../Professor/CardTema";
import CardAreaInteresse from "../Professor/CardAreaInteresse";

import { Professor, Formacao, Tema, AreaInteresse } from "@/types";
import { FC } from "react";
import CardFormacao from "./CardFormacao";
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";
import { on } from "events";

interface PerfilProfessorProps {
  professor: Professor;
  onGerenciarFormacao: () => void;
  onGerenciarTemas: () => void;
  onAdicionarFormacao: () => void;
  onAdicionarAreaInteresse: () => void;
  onAdicionarTema: () => void;
  isMeuPerfil: boolean;
  formacoes?: Formacao[];
  temas?: Tema[];
  areasInteresse?: AreaInteresse[];
  onRemoverAreaInteresse: (areaInteresseId: number) => void;
}

const PerfilProfessor: FC<PerfilProfessorProps> = ({
  professor,
  onGerenciarFormacao,
  onGerenciarTemas,
  onAdicionarFormacao,
  onAdicionarAreaInteresse,
  onAdicionarTema,
  isMeuPerfil,
  formacoes,
  temas,
  areasInteresse,
  onRemoverAreaInteresse
}) => (
  <>
    <CardInfo titulo="ID Lattes" texto={professor.idLattes} link={<Link href={`https://lattes.cnpq.br/${professor.idLattes}`} target="_blank"><SquareArrowOutUpRight color="#669966" /></Link>} />

    <CardFormacao 
      formacoes={formacoes} 
      onGerenciar={onGerenciarFormacao}
      onAdicionarFormacao={onAdicionarFormacao}
      mostrarBotoes={isMeuPerfil} 
    />

    <CardAreaInteresse
      areasInteresse={areasInteresse}
      onAdicionarArea={onAdicionarAreaInteresse}
      mostrarBotoes={isMeuPerfil}
      onRemoverAreaInteresse={onRemoverAreaInteresse}
    />

    <CardTema
      temas={temas} 
      onGerenciar={onGerenciarTemas}
      onAdicionarTema={onAdicionarTema}
      mostrarBotoes={isMeuPerfil} 
    />
  </>
);

export default PerfilProfessor;
