import CardInfo from "../CardInfo";
import CardTema from "../Professor/CardTema";

import { Professor, Formacao, Tema } from "@/types";
import { FC } from "react";
import CardFormacao from "./CardFormacao";
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";

interface PerfilProfessorProps {
  professor: Professor;
  onGerenciarFormacao: () => void;
  onGerenciarTemas: () => void;
  onAdicionarFormacao: () => void;
  onAdicionarTema: () => void;
  isMeuPerfil: boolean;
  formacoes?: Formacao[];
  temas?: Tema[];
}

const PerfilProfessor: FC<PerfilProfessorProps> = ({
  professor,
  onGerenciarFormacao,
  onGerenciarTemas,
  onAdicionarFormacao,
  onAdicionarTema,
  isMeuPerfil,
  formacoes,
  temas,
}) => (
  <>
    <CardInfo titulo="ID Lattes" texto={professor.idLattes} link={<Link href={`https://lattes.cnpq.br/${professor.idLattes}`} target="_blank"><SquareArrowOutUpRight color="#669966" /></Link>} />

    <CardFormacao 
      formacoes={formacoes} 
      onGerenciar={onGerenciarFormacao}
      onAdicionarFormacao={onAdicionarFormacao}
      mostrarBotoes={isMeuPerfil} 
    />

    <CardTema
      temas={temas} 
      onGerenciar={onGerenciarTemas}
      onAdicionarTema={onAdicionarTema}
      mostrarBotoes={isMeuPerfil} 
    />

    {/* <CardOrientador usuario={estudante} orientador={orientador} mostrarBotoes={isMeuPerfil} /> */}
  </>
);

export default PerfilProfessor;
